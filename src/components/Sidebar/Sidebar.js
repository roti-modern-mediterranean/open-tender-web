import React, { useEffect, useRef, useState, useCallback } from 'react'
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
import { displayPrice } from '@open-tender/js'
// import { ButtonLink, ButtonStyled, Preface } from '@open-tender/components'
import { ButtonStyled } from '@open-tender/components'

import { selectSidebar, toggleSidebar } from '../../slices'
import Cart from '../Cart'
import SidebarOverlay from './SidebarOverlay'
import SidebarClose from './SidebarClose'
import styled from '@emotion/styled'

const SidebarView = styled('div')`
  position: fixed;
  z-index: 17;
  top: 0;
  bottom: 0;
  right: 0;
  width: 44rem;
  max-width: 100%;
  transition: all 0.25s ease;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  background-color: ${(props) => props.theme.bgColors.primary};

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
  width: 100%;
  padding: 2rem;
  background-color: ${(props) => props.theme.bgColors.primary};

  h2 {
    margin: 0 0 1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};

    span {
      padding: 0 0.2rem;
      color: ${(props) => props.theme.fonts.headings.color};
      font-weight: ${(props) => props.theme.boldWeight};
    }
  }

  div {
    margin: 2rem auto 0;

    p {
      color: ${(props) => props.theme.colors.alert};
    }
  }
`

const SidebarContent = styled('div')`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0rem 2rem 1rem;
`

const SidebarFooter = styled('div')`
  flex-shrink: 0;
  width: 100%;
  height: 7rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   height: 12.5rem;
  // }

  button {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`

const SidebarButtons = styled('div')`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

// const SidebarCancel = styled('div')`
//   width: 100%;
//   height: 5.5rem;
//   justify-content: center;
//   align-items: flex-start;
//   display: none;
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     display: flex;
//   }
// `

const SidebarBack = styled('div')`
  width: 50%;
  padding: 0 0.5rem 0 2rem;
`

const SidebarCheckout = styled('div')`
  width: 50%;
  padding: 0 2rem 0 0.5rem;
`

const Sidebar = () => {
  const sidebarRef = useRef()
  const [active, setActive] = useState(null)
  const [elements, setElements] = useState([])
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const { isOpen } = useSelector(selectSidebar)
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
  const orderMaxType =
    cartGuest && spendingLimit ? 'spending limit' : 'order maximum'

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

  useEffect(() => {
    if (isOpen) {
      setActive(document.activeElement)
      const allElements = sidebarRef.current.querySelectorAll(
        'a[href], button, input, select, textarea'
      )
      setElements(allElements)
      const firstElement = allElements ? allElements[0] : null
      if (firstElement) firstElement.focus()
    } else {
      if (active) active.focus()
    }
  }, [isOpen, active])

  const handleTabKey = useCallback(
    (evt) => {
      if (evt.keyCode === 9 && sidebarRef.current && elements.length) {
        const activeElements = Array.from(elements).filter((i) => !i.disabled)
        const firstElement = activeElements[0]
        const lastElement = activeElements[activeElements.length - 1]

        if (!evt.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          evt.preventDefault()
        }

        if (evt.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          evt.preventDefault()
        }
      }
    },
    [elements]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleTabKey, false)
    return () => document.removeEventListener('keydown', handleTabKey, false)
  }, [handleTabKey])

  return (
    <>
      <SidebarOverlay />
      <SidebarView ref={sidebarRef} isOpen={isOpen}>
        <div>
          {isOpen && <SidebarClose />}
          <SidebarHeader>
            <h2>{orderId ? `Editing Order ${orderId}` : 'Your Order'}</h2>
            {!notEmpty ? (
              <p>Your cart is currently empty. Please add some items.</p>
            ) : (
              <p>
                <span>{cartCount} items</span> for a total of{' '}
                <span>${cartTotal.toFixed(2)}</span> before tax
              </p>
            )}
            {cartCount !== 0 && belowMinimum && (
              <div>
                <p>
                  Your cart total is below the order minimum of $
                  {displayPrice(orderMinimum)}. Please add some items.
                </p>
              </div>
            )}
            {aboveMaximum && (
              <div>
                <p>
                  Your cart total is above the {orderMaxType} of $
                  {displayPrice(orderMaximum)}. Please edit or remove one or
                  more items before submitting your order.
                </p>
              </div>
            )}
          </SidebarHeader>
          <SidebarContent>
            <Cart />
          </SidebarContent>
          <SidebarFooter>
            <SidebarButtons>
              <SidebarBack>
                {isCheckout && cartId ? (
                  <ButtonStyled onClick={handleReopen} size="big">
                    Reopen
                  </ButtonStyled>
                ) : (
                  <ButtonStyled
                    onClick={handleBack}
                    size="big"
                    disabled={!canOrder}
                  >
                    Menu
                  </ButtonStyled>
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
                      ? 'Review All Orders'
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
            </SidebarButtons>
            {/* <SidebarCancel>
              <div>
                <ButtonLink
                  onClick={handleClose}
                >
                  <Preface>Close Sidebar</Preface>
                </ButtonLink>
              </div>
            </SidebarCancel> */}
          </SidebarFooter>
        </div>
      </SidebarView>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
