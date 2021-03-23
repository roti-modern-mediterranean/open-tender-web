import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartQuantity,
  selectCartTotal,
  selectMenuSlug,
  selectCanOrder,
  selectGroupOrder,
  selectOrder,
  selectOrderLimits,
  setCart,
  closeGroupOrder,
  checkout,
} from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import { ButtonLink, ButtonStyled, Preface } from '@open-tender/components'

import { toggleSidebar } from '../../slices'
import Cart from '../Cart'
import SidebarClose from './SidebarClose'
import styled from '@emotion/styled'
import { Container } from '..'
import iconMap from '../iconMap'

const SidebarView = styled('aside')`
  position: fixed;
  z-index: 17;
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

const SidebarHeader = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.bgColors.light};
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
  }

  div {
    width: 100%;
    text-align: center;
  }

  h2 {
    line-height: 1;
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }
`

const SidebarCart = styled('div')`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 0 1rem;
`

const SidebarFooter = styled('div')`
  flex-shrink: 0;
  width: 100%;
  height: 14.5rem;
  background-color: ${(props) => props.theme.bgColors.light};

  // button {
  //   width: 100%;
  //   padding-left: 0;
  //   padding-right: 0;
  // }
`

const SidebarSubtotal = styled('div')`
  width: 100%;
  height: 6.5rem;
  background-color: ${(props) => props.theme.bgColors.light};

  & > div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: block;
      font-size: 2.1rem;
      font-weight: normal;

      &:first-of-type {
        text-transform: none;
      }

      span {
        font-weight: 500;
        display: inline;
        padding-left: 1rem;
      }
    }
  }
`

const SidebarButtons = styled('div')`
  width: 100%;
  height: 8rem;
  background-color: ${(props) => props.theme.bgColors.dark};

  & > div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const SidebarBack = styled('div')`
  button {
    display: flex;
    align-items: center;

    span:first-of-type {
      display: block;
      color: ${(props) => props.theme.colors.light};
      font-size: 2.1rem;
      font-weight: 500;
      text-transform: none;
    }

    span:last-of-type {
      position: relative;
      top: 0.2rem;
      display: block;
      line-height: 0;
      width: 2.2rem;
      height: 2.2rem;
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const SidebarCheckout = styled('div')`
  button {
    border-radius: 2.5rem;
  }
`

const CartAlert = styled(Preface)`
  color: ${(props) => props.theme.colors.paprika};
`

const Sidebar = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const { orderId, cart } = useSelector(selectOrder)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartGuest, isCartOwner, spendingLimit } = groupOrder
  const cartCount = useSelector(selectCartQuantity)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const canOrder = useSelector(selectCanOrder)
  const { orderMinimum, orderMaximum } = useSelector(selectOrderLimits)
  const isMenu = pathname.includes('menu')
  const isCheckout = pathname.includes('checkout')
  const isReview = pathname.includes('review')
  const belowMinimum = orderMinimum && cartTotal < orderMinimum
  const aboveMaximum = orderMaximum && cartTotal > orderMaximum
  const notEmpty = cartCount !== 0 || (isCartOwner && isMenu)
  const canCheckout = canOrder && !belowMinimum && !aboveMaximum && notEmpty
  const showReview = cartGuest || (isMenu && isCartOwner)
  const orderMaxType = cartGuest && spendingLimit ? 'group max' : 'maximum'

  const handleBack = () => {
    dispatch(toggleSidebar())
    if (!isMenu) history.push(menuSlug)
  }

  const handleReview = () => {
    dispatch(toggleSidebar())
    if (!isReview) history.push(`/review`)
  }

  const handleCheckout = () => {
    dispatch(toggleSidebar())
    if (!isCheckout) {
      dispatch(checkout())
      history.push(`/checkout`)
    }
  }

  const handleReopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(toggleSidebar())
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      history.push('/review')
    })
  }

  return (
    <SidebarView ref={ref}>
      <div>
        <SidebarClose />
        <SidebarHeader>
          <Container>
            <h2>{orderId ? `Editing Order ${orderId}` : 'Your Order'}</h2>
          </Container>
        </SidebarHeader>
        <SidebarCart>
          <Container>
            <Cart />
          </Container>
        </SidebarCart>
        <SidebarFooter>
          <SidebarSubtotal>
            <Container>
              {cartCount !== 0 && belowMinimum ? (
                <CartAlert>
                  Below {formatDollars(orderMinimum)} minimum
                </CartAlert>
              ) : aboveMaximum ? (
                <CartAlert>
                  Above {formatDollars(orderMaximum)} {orderMaxType}
                </CartAlert>
              ) : (
                <Preface>
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} added
                </Preface>
              )}
              <Preface>
                Subtotal <span>{formatDollars(cartTotal)}</span>
              </Preface>
            </Container>
          </SidebarSubtotal>
          <SidebarButtons>
            <Container>
              <SidebarBack>
                {isCheckout && cartId ? (
                  <ButtonLink onClick={handleReopen} size="big">
                    <Preface>Reopen Group Order</Preface>
                    <span>{iconMap.ChevronRight}</span>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    onClick={handleBack}
                    size="big"
                    disabled={!canOrder}
                  >
                    <Preface>Continue Shopping</Preface>
                    <span>{iconMap.ChevronRight}</span>
                  </ButtonLink>
                )}
              </SidebarBack>
              <SidebarCheckout>
                {showReview ? (
                  <ButtonStyled
                    onClick={handleReview}
                    size="big"
                    color="cart"
                    disabled={!canCheckout}
                  >
                    {isReview
                      ? 'Close'
                      : isCartOwner
                      ? 'Review Orders'
                      : 'Submit Order'}
                  </ButtonStyled>
                ) : (
                  <ButtonStyled
                    onClick={handleCheckout}
                    size="big"
                    color="cart"
                    disabled={!canCheckout}
                  >
                    {isCheckout ? 'Close' : 'Checkout'}
                  </ButtonStyled>
                )}
              </SidebarCheckout>
            </Container>
          </SidebarButtons>
        </SidebarFooter>
      </div>
    </SidebarView>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
