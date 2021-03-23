import styled from '@emotion/styled'
import {
  ButtonLink,
  ButtonStyled,
  Preface,
  useBuilder,
} from '@open-tender/components'

import { CartFooter } from '.'
import { ChevronLeft } from './icons'

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

const BuilderFooter = styled('div')`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
`

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
  spinner,
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

  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin

  return (
    <BuilderView>
      <BuilderContent>{item.name}</BuilderContent>
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
