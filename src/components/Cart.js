import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Minus } from 'react-feather'
import {
  setCurrentItem,
  incrementItemInCart,
  decrementItemInCart,
  selectCart,
  removeItemFromCart,
} from '@open-tender/redux'
import { CartItem, BuilderQuantity } from '@open-tender/components'

import { openModal, selectDisplaySettings } from '../slices'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const displaySettings = useSelector(selectDisplaySettings)

  const editItem = (item) => {
    dispatch(setCurrentItem(item))
    dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
  }

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item))
  }

  return cart && cart.length ? (
    <ul>
      {cart.map((item, index) => {
        return (
          <li key={`${item.id}-${index}`}>
            <CartItem
              item={item}
              showModifiers={true}
              editItem={() => editItem(item)}
              removeItem={() => removeItem(item)}
              displaySettings={displaySettings}
            >
              <BuilderQuantity
                item={item}
                adjust={null}
                increment={() => dispatch(incrementItemInCart(item))}
                decrement={() => dispatch(decrementItemInCart(item))}
                incrementDisabled={item.quantity === item.max}
                decrementDisabled={false}
                iconMap={iconMap}
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
