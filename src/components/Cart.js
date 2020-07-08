import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentItem,
  incrementItemInCart,
  decrementItemInCart,
  selectCart,
  removeItemFromCart,
} from '@open-tender/redux'
import { CartItem, BuilderQuantity } from 'open-tender'

import { openModal } from '../slices'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)

  const editItem = (evt, item) => {
    evt.preventDefault()
    dispatch(setCurrentItem(item))
    dispatch(openModal({ type: 'item' }))
    evt.target.blur()
  }

  const removeItem = (evt, item) => {
    evt.preventDefault()
    dispatch(removeItemFromCart(item.index))
    evt.target.blur()
  }

  return cart && cart.length ? (
    <ul className="cart ot-bg-color-primary ot-border-radius">
      {cart.map((item, index) => {
        return (
          <li key={`${item.id}-${index}`}>
            <CartItem
              item={item}
              showModifiers={true}
              editItem={(evt) => editItem(evt, item)}
              removeItem={(evt) => removeItem(evt, item)}
            >
              <BuilderQuantity
                item={item}
                adjust={null}
                increment={() => dispatch(incrementItemInCart(index))}
                decrement={() => dispatch(decrementItemInCart(index))}
                incrementDisabled={item.quantity === item.max}
                decrementDisabled={false}
                classes={null}
              />
            </CartItem>
          </li>
        )
      })}
    </ul>
  ) : null
}

Cart.displayName = 'Cart'

export default Cart
