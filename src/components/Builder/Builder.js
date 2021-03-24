import styled from '@emotion/styled'
import { animateScroll } from 'react-scroll'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Preface,
  useBuilder,
} from '@open-tender/components'
import { formatDollars } from '@open-tender/js'
import { useEffect, useRef, useState } from 'react'

import { CartClose, CartFooter, Container, ImageSpinner } from '..'
import { closeModal } from '../../slices'
import { ButtonSmall } from '../buttons'
import { ChevronDown, ChevronLeft, ChevronUp } from '../icons'
import BuilderImage from './BuilderImage'
import BuilderMadeFor from './BuilderMadeFor'
import BuilderNotes from './BuilderNotes'

const BuilderView = styled('form')`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 0 14.5rem;
  margin: 0;
  // background-color: ${(props) => props.theme.bgColors.light};
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
  line-height: 1;
  color: ${(props) => props.theme.colors.primary};
`

const BuilderInfo = styled('div')`
  position: relative;
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
  margin: 0 0 0;
`

const BuilderIngredients = styled('div')`
  padding: 2rem 0 0;
  margin: 0 0 2.5rem;
`

const BuilderIngredientsText = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  margin: 1rem 0 0;
`

const BuilderIngredientsHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BuilderIngredientsTitle = styled(Preface)`
  font-size: 2.8rem;
  line-height: 1;
  letter-spacing: 0.01em;
  font-weight: 500;
`

const BuilderToggle = styled(ButtonSmall)`
  // min-width: 12rem;
  color: ${(props) => props.theme.colors.beet};
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  background-color: transparent;

  span span {
    position: relative;
    top: -0.1rem;
    display: inline-block;
    margin: 0 0 0 0.5rem;
  }

  &:focus {
    outline: none;
  }
`

const BuilderGroups = styled('div')`
  padding: 0 0 3rem;
  background-color: ${(props) => props.theme.bgColors.light};
`

const BuilderGroupsNav = styled('div')`
  padding: 3rem ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 3rem ${(props) => props.theme.layout.paddingMobile};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 100%;
    // overflow-x: scroll;
    margin: 0 -1.2rem;
  }
`

const BuilderGroupsNavButton = styled(ButtonSmall)`
  // flex-shrink: 0;
  margin: 0;
  padding: 0.8rem 1.2rem;
  // padding: ${(props) =>
    props.isActive ? '0.8rem 1.5rem 0.8rem' : '0.8rem 0 0.8rem 1.5rem'};
  color: ${(props) =>
    props.isActive ? props.theme.colors.light : props.theme.colors.beet};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.beet : 'transparent'};
  box-shadow: ${(props) =>
    props.isActive ? '0px 4px 20px rgba(0, 0, 0, 0.25)' : 'none'};

  &:focus {
    outline: none;
  }
`

const BuilderNameNotes = styled('div')`
  padding: 3rem 0 0;
  background-color: ${(props) => props.theme.bgColors.light};
`

const BuilderNameNotesWrapper = styled('div')`
  padding: 1.5rem 2rem 2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  border-radius: 1.4rem;
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
  const price = zeroPrice ? null : `${formatDollars(item.price)}`
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
  const scrollRef = useRef(null)
  const ingredientsRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeGroup, setActiveGroup] = useState(0)
  const { groups, notes, madeFor, totalPrice } = item
  console.log(item)
  const imageUrl = item.imageUrl ? item.imageUrl : null
  const {
    calories: showCals,
    madeFor: showMadeFor,
    notes: showNotes,
    // builderImages: showImage,
    // tags: showTags,
    // allergens: showAllergens,
  } = displaySettings
  const priceCals = makePriceCals(item, showCals)
  const priceTotal = formatDollars(item.totalPrice)
  const hasGroups = groups.length > 0
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin

  useEffect(() => {
    if (isOpen) {
      const topOffset = ingredientsRef.current.getBoundingClientRect().top
      animateScroll.scrollTo(topOffset, {
        container: scrollRef.current,
        duration: 500,
        smooth: true,
      })
    }
  }, [isOpen])

  const toggleIngredients = (evt) => {
    evt.preventDefault()
    if (isOpen) {
      animateScroll.scrollTo(0, {
        container: scrollRef.current,
        duration: 500,
        smooth: true,
      })
      setTimeout(() => setIsOpen(false), 500)
    } else {
      setIsOpen(true)
    }
  }

  const toggleGroups = (evt, index) => {
    evt.preventDefault()
    setActiveGroup(index)
  }

  return (
    <BuilderView>
      <BuilderContent ref={scrollRef}>
        <BuilderImage imageUrl={imageUrl} spinner={<ImageSpinner />}>
          <CartClose
            label="Close item & return to menu"
            onClick={cancel}
            style={{ top: '3rem' }}
          />
        </BuilderImage>
        <BuilderInfo>
          <BuilderHeader>
            <div>
              <BuilderCategory>{item.category}</BuilderCategory>
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
            <BuilderIngredients ref={ingredientsRef}>
              <BuilderIngredientsHeader>
                <BuilderIngredientsTitle>Ingredients</BuilderIngredientsTitle>
                <BuilderToggle onClick={toggleIngredients}>
                  {isOpen ? (
                    <span>
                      Close <ChevronUp />
                    </span>
                  ) : (
                    <span>
                      Customize <ChevronDown />
                    </span>
                  )}
                </BuilderToggle>
              </BuilderIngredientsHeader>
              <BuilderIngredientsText>
                Lorem ipsum dolor sit amet, consecnunc sed velit tempor, laoreet
                ante eget, vestibulum purus.
              </BuilderIngredientsText>
            </BuilderIngredients>
          </Container>
          {isOpen && (
            <>
              {hasGroups && (
                <BuilderGroups>
                  <BuilderGroupsNav>
                    <div>
                      {groups.map((group, index) => (
                        <BuilderGroupsNavButton
                          key={group.name}
                          onClick={(evt) => toggleGroups(evt, index)}
                          isActive={index === activeGroup}
                        >
                          {group.name}
                        </BuilderGroupsNavButton>
                      ))}
                    </div>
                    {/* <div style={{ width: '2rem' }}>&nbsp;</div> */}
                  </BuilderGroupsNav>
                  <Container>
                    <p>Groups will go here.</p>
                  </Container>
                </BuilderGroups>
              )}
              {((showMadeFor && !cartId) || showNotes) && (
                <BuilderNameNotes>
                  <Container>
                    <BuilderNameNotesWrapper>
                      {showMadeFor && !cartId && (
                        <BuilderMadeFor
                          madeFor={madeFor}
                          setMadeFor={setMadeFor}
                        />
                      )}
                      {showNotes && (
                        <BuilderNotes notes={notes} setNotes={setNotes} />
                      )}
                    </BuilderNameNotesWrapper>
                  </Container>
                </BuilderNameNotes>
              )}
            </>
          )}
        </BuilderInfo>
      </BuilderContent>
      <BuilderFooter>
        <CartFooter
          label={<span>Total Price</span>}
          total={
            <span>
              <span>{priceTotal}</span>
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
