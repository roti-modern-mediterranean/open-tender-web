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
import { displayPrice } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectSidebar, toggleSidebar } from '../slices'
import SidebarOverlay from './SidebarOverlay'
import Cart from './Cart'
import SidebarClose from './SidebarClose'

const Sidebar = () => {
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
  const classes = `sidebar ot-bg-color-primary ${isOpen ? 'is-open' : ''}`
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

  const handleBack = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    if (!isMenu) history.push(menuSlug)
    evt.target.blur()
  }

  const handleReview = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    if (!isReview) history.push(`/review`)
    evt.target.blur()
  }

  const handleCheckout = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    if (!isCheckout) {
      dispatch(checkout())
      history.push(`/checkout`)
    }
    evt.target.blur()
  }

  const handleClose = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    evt.target.blur()
  }

  const handleReopen = (evt) => {
    evt.preventDefault()
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(toggleSidebar())
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      history.push('/review')
    })
    evt.target.blur()
  }

  return (
    <>
      <SidebarOverlay />
      <aside className={classes}>
        <div className="sidebar__container">
          {isOpen && <SidebarClose />}
          <div className="sidebar__header ot-bg-color-primary">
            <h2 className="sidebar__title ot-font-size-h3">
              {orderId ? `Editing Order ${orderId}` : 'Your Order'}
            </h2>
            {!notEmpty ? (
              <p className="ot-font-size-small ot-color-alert">
                Your cart is currently empty. Please add some items.
              </p>
            ) : (
              <p className="ot-font-size-small">
                <span className="ot-bold ot-color-headings">
                  {cartCount} items
                </span>{' '}
                for a total of{' '}
                <span className="ot-bold ot-color-headings">
                  ${cartTotal.toFixed(2)}
                </span>{' '}
                before tax
              </p>
            )}
            {cartCount !== 0 && belowMinimum && (
              <div className="sidebar__header__message">
                <p className="ot-font-size-small ot-color-alert">
                  Your cart total is below the order minimum of $
                  {displayPrice(orderMinimum)}. Please add some items.
                </p>
              </div>
            )}
            {aboveMaximum && (
              <div className="sidebar__header__message">
                <p className="ot-font-size-small ot-color-alert">
                  Your cart total is above the {orderMaxType} of $
                  {displayPrice(orderMaximum)}. Please edit or remove one or
                  more items before submitting your order.
                </p>
              </div>
            )}
          </div>
          <div className="sidebar__content">
            <Cart />
          </div>
          <div className="sidebar__footer ot-bg-color-primary">
            <div className="sidebar__footer__container">
              <div className="sidebar__back">
                {isCheckout && cartId ? (
                  <Button onClick={handleReopen} classes="ot-btn ot-btn--big">
                    Reopen
                  </Button>
                ) : (
                  <Button
                    onClick={handleBack}
                    classes="ot-btn ot-btn--big"
                    disabled={!canOrder}
                  >
                    Menu
                  </Button>
                )}
              </div>
              <div className="sidebar__checkout">
                {showReview ? (
                  <Button
                    onClick={handleReview}
                    classes="ot-btn ot-btn--big ot-btn--highlight"
                    disabled={!canCheckout}
                  >
                    {isReview
                      ? 'Close'
                      : isCartOwner
                      ? 'Review All Orders'
                      : 'Submit Order'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheckout}
                    classes="ot-btn ot-btn--big ot-btn--highlight"
                    disabled={!canCheckout}
                  >
                    {isCheckout ? 'Close' : 'Checkout'}
                  </Button>
                )}
              </div>
            </div>
            <div className="sidebar__footer__cancel">
              <div className="sidebar__footer__cancel__button ot-font-size-small">
                <Button
                  onClick={handleClose}
                  classes="ot-btn-link-subtle ot-preface"
                >
                  Close Sidebar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
