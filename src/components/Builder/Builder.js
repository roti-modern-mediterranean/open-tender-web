import styled from '@emotion/styled'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Preface,
  useBuilder,
} from '@open-tender/components'
import { displayPrice } from '@open-tender/js'

import { CartFooter, Container, ImageSpinner } from '..'
import { ChevronLeft } from '../icons'
import BuilderImage from './BuilderImage'

const BuilderView = styled('form')`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 0 14.5rem;
  margin: 0;
`

const BuilderContent = styled('div')`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const BuilderHeader = styled('div')`
  position: absolute;
  z-index: 1;
  top: -10rem;
  width: 100%;
  height: 10rem;
  // background-color: #ccc;

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
  }
`

const BuilderCategory = styled('h2')`
  display: block;
  font-size: 11.5rem;
  line-height: 1;
  margin: -1rem 0 0;
`

const BuilderNameView = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BuilderName = styled(Heading)`
  font-weight: 600;
  letter-spacing: 0.2em;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.primary};
`

const BuilderInfo = styled('div')`
  position: relative;
  padding: 0rem 0 0;
  // background-color: ${(props) => props.theme.bgColors.secondary};
`

const BuilderPrice = styled(Preface)`
  text-align: center;
  font-weight: 500;
  font-size: 2.6rem;
  letter-spacing: 0.03em;
  text-transform: none;
  margin: 0 0 2rem;
`

const BuilderDescription = styled('p')`
  line-height: ${(props) => props.theme.lineHeight};
  margin: 0 0 2rem;
`

const BuilderFooter = styled('div')`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
`

const makePriceCals = (item, showCals) => {
  const zeroPrice = !!(item.price === '0.00' || item.price === 0)
  const price = zeroPrice ? null : `$${displayPrice(item.price)}`
  const cals = showCals && item.cals ? `${item.cals.toFixed(0)} cals` : null
  const separator = price && cals ? ' / ' : ''
  const priceCals = `${cals || ''}${separator}${price || ''}`
  return priceCals || null
}

const Builder = ({
  menuItem,
  addItemToCart,
  cancel,
  soldOut,
  allergens,
  renderHeader,
  renderOption,
  displaySettings,
  cartId,
}) => {
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut)
  const { groups, notes, madeFor, totalPrice } = item
  const imageUrl = item.imageUrl ? item.imageUrl : null
  const {
    calories: showCals,
    // builderImages: showImage,
    // tags: showTags,
    // allergens: showAllergens,
  } = displaySettings
  const hasIngredients = item.ingredients && item.ingredients.length > 0
  const priceCals = makePriceCals(item, showCals)

  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin

  return (
    <BuilderView>
      <BuilderContent>
        <BuilderImage imageUrl={imageUrl} spinner={<ImageSpinner />} />
        <BuilderInfo>
          <BuilderHeader>
            <div>
              <BuilderCategory>Salad</BuilderCategory>
              <BuilderNameView>
                <BuilderName as="div">{item.name}</BuilderName>
              </BuilderNameView>
            </div>
          </BuilderHeader>
          <Container>
            {priceCals ? (
              <BuilderPrice as="p">{priceCals}</BuilderPrice>
            ) : (
              <BuilderPrice as="p">&nbsp;</BuilderPrice>
            )}
            <BuilderDescription>{item.description}</BuilderDescription>
          </Container>
        </BuilderInfo>
      </BuilderContent>
      <BuilderFooter>
        <CartFooter
          label={<span>Subtotal</span>}
          total={
            <span>
              <span>$30.00</span>
            </span>
          }
          back={
            <ButtonLink onClick={cancel}>
              <ChevronLeft />
              <Preface>Back To Menu</Preface>
            </ButtonLink>
          }
          add={
            <ButtonStyled
              onClick={() => addItemToCart(item)}
              disabled={isIncomplete}
              size="big"
              color="cart"
            >
              Add To Cart
            </ButtonStyled>
          }
        />
      </BuilderFooter>
    </BuilderView>
  )
}

export default Builder
