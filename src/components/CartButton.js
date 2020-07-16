import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ShoppingBag } from 'react-feather'
import { isMobile } from 'react-device-detect'
import { selectCartQuantity } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { toggleSidebar } from '../slices'

const CartButton = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const cartQuantity = useSelector(selectCartQuantity)
  const countFontSize = isMobile ? 'ot-font-size-x-small' : 'ot-font-size-small'
  const isHome = pathname === '/'
  const isLocations = pathname.includes('locations')
  const hideCart = (isHome || isLocations) && cartQuantity === 0

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    evt.target.blur()
  }

  return !hideCart ? (
    <div className="cart-button">
      <div className="cart-button__container">
        {cartQuantity > 0 && (
          <div
            className={`cart-button__count ot-warning ot-bold ${countFontSize}`}
          >
            {cartQuantity}
          </div>
        )}
        <Button
          onClick={handleClick}
          classes="cart-button__button ot-btn--highlight"
        >
          <div className="cart-button__icon">
            <ShoppingBag size={null} />
          </div>
        </Button>
      </div>
    </div>
  ) : null
}

CartButton.displayName = 'CartButton'

export default CartButton
