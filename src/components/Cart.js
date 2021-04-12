import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setCurrentItem,
  incrementItemInCart,
  decrementItemInCart,
  selectCart,
  removeItemFromCart,
  selectMenuSlug,
  selectOrder,
} from '@open-tender/redux'
import { BuilderQuantity } from '@open-tender/components'
import { slugify } from '@open-tender/js'

import {
  selectDisplaySettings,
  toggleSidebar,
  toggleSidebarModal,
} from '../slices'
import { MinusSign, PlusSign } from './icons'
import { CartItem } from '.'

const quantityIconMap = {
  plus: <PlusSign />,
  minus: <MinusSign />,
}

const Cart = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderType } = useSelector(selectOrder)
  const cart = useSelector(selectCart)
  const displaySettings = useSelector(selectDisplaySettings)
  const menuSlug = useSelector(selectMenuSlug)

  const editItem = (item) => {
    dispatch(setCurrentItem(item))
    dispatch(toggleSidebar())
    orderType === 'CATERING'
      ? dispatch(toggleSidebarModal())
      : history.push(`${menuSlug}/item/${slugify(item.name)}`)
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
                iconMap={quantityIconMap}
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
