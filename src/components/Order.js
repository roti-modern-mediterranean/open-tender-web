import React from 'react'
import propTypes from 'prop-types'
import { CartItem } from '../packages'
import { makeDisplayItem } from '../packages/utils/cart'
import OrderQuantity from '../packages/OrderQuantity'

const Order = ({ order, loading, error }) => {
  console.log(order)

  const { items } = order || {}
  const displayedItems = items ? items.map((i) => makeDisplayItem(i)) : []
  console.log(displayedItems)

  return (
    <div className="order">
      <div className="order__header">
        <h1>Order #{order.order_id}</h1>
      </div>
      <div className="order__section">
        <div className="order__section__title">
          <h2 className="ot-font-size-h3">Items</h2>
        </div>
        <div className="order__section__content">
          <ul className="cart bg-color border-radius">
            {displayedItems.map((item, index) => {
              return (
                <li key={`${item.id}-${index}`}>
                  <CartItem item={item} showModifiers={true}>
                    <OrderQuantity item={item} />
                  </CartItem>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

Order.displayName = 'Order'
Order.propTypes = {
  order: propTypes.object,
  loading: propTypes.bool,
  error: propTypes.string,
}
export default Order
