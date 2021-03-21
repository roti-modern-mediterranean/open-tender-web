import React from 'react'
import propTypes from 'prop-types'
import { CardList, CardListItem, OrderCard, OrderCardGroup } from '../..'

const OrdersList = ({ orders, isGroup = false }) => {
  return (
    <CardList>
      {orders.map((order) => {
        return (
          <CardListItem key={order.order_id || order.token}>
            {isGroup ? (
              <OrderCardGroup order={order} />
            ) : (
              <OrderCard order={order} />
            )}
          </CardListItem>
        )
      })}
    </CardList>
  )
}

OrdersList.displayName = 'OrdersList'
OrdersList.propTypes = {
  orders: propTypes.array,
  delay: propTypes.number,
}

export default OrdersList
