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
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Preface,
} from '@open-tender/components'

import { toggleSidebar } from '../../slices'
import Cart from '../Cart'
import styled from '@emotion/styled'
import { CartClose, CartFooter, Container } from '..'
import { ChevronLeft } from '../icons'

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
  flex-shrink: 0;
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
`

const SidebarTitle = styled(Heading)`
  margin: 0.2rem 0 0;
  line-height: 1;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.sizes.h3};
`

const SidebarTitleSmall = styled(SidebarTitle)`
  font-size: ${(props) => props.theme.fonts.sizes.h5};
`

const SidebarCart = styled('div')`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 0 1rem;
`

const CartAlert = styled('span')`
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
      history.push(`/checkout/register`)
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
        <CartClose
          label="Close cart & continue shopping"
          onClick={() => dispatch(toggleSidebar())}
        />
        <SidebarHeader>
          <Container>
            {orderId ? (
              <SidebarTitleSmall as="p">
                Editing Order #{orderId}
              </SidebarTitleSmall>
            ) : (
              <SidebarTitle as="p">Your Order</SidebarTitle>
            )}
          </Container>
        </SidebarHeader>
        <SidebarCart>
          <Container>
            <Cart />
          </Container>
        </SidebarCart>
        <CartFooter
          label={
            cartCount !== 0 && belowMinimum ? (
              <CartAlert>Below {formatDollars(orderMinimum)} minimum</CartAlert>
            ) : aboveMaximum ? (
              <CartAlert>
                Above {formatDollars(orderMaximum)} {orderMaxType}
              </CartAlert>
            ) : (
              <span style={{ textTransform: 'none' }}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'} added
              </span>
            )
          }
          total={
            <span>
              Subtotal <span>{formatDollars(cartTotal)}</span>
            </span>
          }
          back={
            isCheckout && cartId ? (
              <ButtonLink onClick={handleReopen} size="big">
                <ChevronLeft />
                <Preface>Reopen Group Order</Preface>
              </ButtonLink>
            ) : (
              <ButtonLink onClick={handleBack} size="big" disabled={!canOrder}>
                <ChevronLeft />
                <Preface>Continue Shopping</Preface>
              </ButtonLink>
            )
          }
          add={
            showReview ? (
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
            )
          }
        />
      </div>
    </SidebarView>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
