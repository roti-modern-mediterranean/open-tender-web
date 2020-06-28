import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartQuantity } from '../slices/orderSlice'
import { toggleSidebar } from '../slices/sidebarSlice'
import { Button } from 'open-tender'
import { ShoppingBag } from 'react-feather'

const CartButton = () => {
  const dispatch = useDispatch()
  const cartquantity = useSelector(selectCartQuantity)

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    evt.target.blur()
  }

  return (
    <div className="cart-button">
      <div className="cart-button__container">
        {cartquantity > 0 && (
          <div className="cart-button__count btn--cart-count">
            {cartquantity}
          </div>
        )}
        <Button onClick={handleClick} classes="cart-button__button btn--cart">
          <div className="cart-button__icon">
            <ShoppingBag size={null} />
          </div>
        </Button>
      </div>
    </div>
  )
}

CartButton.displayName = 'CartButton'

export default CartButton
