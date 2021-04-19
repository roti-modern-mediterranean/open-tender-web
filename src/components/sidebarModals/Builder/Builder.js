import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItem, addItemToCart } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Preface,
  useBuilder,
} from '@open-tender/components'

import { toggleSidebarModal, selectDisplaySettings } from '../../../slices'
import styled from '@emotion/styled'
import { CartFooter, Container, SidebarModalClose } from '../..'
import BuilderItemQuantity from '../../Builder/BuilderItemQuantity'
import { ChevronLeft } from '../../icons'
import BuilderGroup from './BuilderGroup'
import BuilderMadeFor from '../../Builder/BuilderMadeFor'
import BuilderNotes from '../../Builder/BuilderNotes'

const BuilderView = styled('aside')`
  position: fixed;
  z-index: 18;
  top: 0;
  bottom: 0;
  right: 0;
  width: 44rem;
  max-width: 100%;
  background-color: ${(props) => props.theme.bgColors.light};

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`

const BuilderHeader = styled('div')`
  // flex-shrink: 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.bgColors.light};
  margin-top: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-top: ${(props) => props.theme.layout.navHeightMobile};
  }

  div {
    width: 100%;
    text-align: center;
  }
`

const BuilderTitle = styled(Preface)`
  font-weight: 500;
  font-size: 2.8rem;
  letter-spacing: 0.01em;
`

const BuilderGroups = styled('div')`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 0 19rem;
`

const BuilderNameNotes = styled('div')`
  margin: 3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: 3rem 0 0;
  }
`

const BuilderFooter = styled('div')`
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
`

const Builder = React.forwardRef(({ menuItem, soldOut }, ref) => {
  const dispatch = useDispatch()
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut)
  const { name, groups, notes, madeFor, totalPrice } = item
  const priceTotal = formatDollars(item.totalPrice)
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const displaySettings = useSelector(selectDisplaySettings)
  const { madeFor: showMadeFor, notes: showNotes } = displaySettings

  const cancel = () => {
    dispatch(toggleSidebarModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  const addItem = () => {
    dispatch(addItemToCart(item))
    dispatch(toggleSidebarModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  return (
    <BuilderView ref={ref}>
      <div>
        <SidebarModalClose label="Cancel" onClick={cancel} />
        <BuilderGroups>
          <Container>
            <BuilderHeader>
              <BuilderTitle as="p">{name}</BuilderTitle>
            </BuilderHeader>
            {groups.map((group) => (
              <BuilderGroup
                key={group.id}
                group={group}
                incrementOption={incrementOption}
                decrementOption={decrementOption}
                setOptionQuantity={setOptionQuantity}
              />
            ))}
            {(showMadeFor || showNotes) && (
              <BuilderNameNotes>
                {showMadeFor && (
                  <BuilderMadeFor madeFor={madeFor} setMadeFor={setMadeFor} />
                )}
                {showNotes && (
                  <BuilderNotes notes={notes} setNotes={setNotes} />
                )}
              </BuilderNameNotes>
            )}
          </Container>
        </BuilderGroups>
        <BuilderFooter>
          <CartFooter
            label={
              <BuilderItemQuantity
                item={item}
                increment={increment}
                decrement={decrement}
                setQuantity={setQuantity}
              />
            }
            total={
              <span>
                Total Price
                <span>{priceTotal}</span>
              </span>
            }
            back={
              <ButtonLink onClick={cancel}>
                <ChevronLeft />
                <Preface>Back To Category</Preface>
              </ButtonLink>
            }
            add={
              <ButtonStyled
                onClick={addItem}
                disabled={isIncomplete}
                size="big"
                color="cart"
              >
                Add To Cart
              </ButtonStyled>
            }
          />
        </BuilderFooter>
      </div>
    </BuilderView>
  )
})

Builder.displayName = 'Builder'

export default Builder
