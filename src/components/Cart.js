import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementItemInCart,
  decrementItemInCart,
  selectCart,
} from '../slices/orderSlice'
import { BuilderOptionWrapper, BuilderQuantity } from './packages'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  return cart.length ? (
    <ul className="cart bg-color border-radius">
      {cart.map((item, index) => {
        return (
          <li key={`${item.id}-${index}`}>
            <BuilderOptionWrapper option={item} isCart={true}>
              <BuilderQuantity
                item={item}
                adjust={null}
                increment={() => dispatch(incrementItemInCart(index))}
                decrement={() => dispatch(decrementItemInCart(index))}
                incrementDisabled={item.quantity === item.max}
                decrementDisabled={false}
                classes={null}
              />
            </BuilderOptionWrapper>
          </li>
        )
      })}
    </ul>
  ) : null
}

Cart.displayName = 'Cart'

export default Cart
