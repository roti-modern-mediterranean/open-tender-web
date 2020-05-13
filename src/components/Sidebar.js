import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { selectSidebar, toggleSidebar } from '../slices/sidebarSlice'
import {
  selectCartQuantity,
  selectCartTotal,
  selectMenuSlug,
} from '../slices/orderSlice'
import SidebarOverlay from './SidebarOverlay'
import { Button } from '../packages'
import Cart from './Cart'

const Sidebar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const { isOpen } = useSelector(selectSidebar)
  const cartCount = useSelector(selectCartQuantity)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const classes = `sidebar bg-secondary-color ${isOpen ? 'is-open' : ''}`
  const isMenu = pathname.includes('menu')
  const isCheckout = pathname.includes('checkout')

  const handleBack = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    if (!isMenu) history.push(menuSlug)
    evt.target.blur()
  }

  const handleCheckout = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    if (!isCheckout) history.push(`/checkout`)
    evt.target.blur()
  }

  return (
    <>
      <SidebarOverlay />
      <div className={classes}>
        <div className="sidebar__container">
          <div className="sidebar__header bg-color">
            {/* <h2 className="ot-font-size-h5">Your Order from {locationName}</h2> */}
            <h2 className="sidebar__title ot-font-size-h3">Your Order</h2>
            {cartCount === 0 ? (
              <p className="font-size-small ot-alert-color">
                Your cart is currently empty. Please add some items.
              </p>
            ) : (
              <p className="font-size-small secondary-color">
                <span className="ot-bold body-color">{cartCount} items</span>{' '}
                for a total of{' '}
                <span className="ot-bold body-color">
                  ${cartTotal.toFixed(2)}
                </span>{' '}
                before tax
              </p>
            )}
          </div>
          <div className="sidebar__content">
            <Cart />
          </div>
          <div className="sidebar__footer bg-color">
            <div className="sidebar__back">
              <Button onClick={handleBack} classes="btn btn--big">
                Back To {isMenu ? 'Order' : 'Menu'}
              </Button>
            </div>
            <div className="sidebar__checkout">
              <Button
                onClick={handleCheckout}
                // classes={`btn btn--big ${!isCheckout ? 'btn--checkout' : ''}`}
                classes="btn btn--big btn--checkout"
                disabled={cartCount === 0}
              >
                {isCheckout ? 'Close Sidebar' : 'Checkout'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
