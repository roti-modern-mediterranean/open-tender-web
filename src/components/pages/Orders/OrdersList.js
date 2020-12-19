import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { OrderCard } from '../..'

const OrdersListContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem -1rem;
`
const OrderListItem = styled('div')`
    flex: 1 0 30rem;
    padding: 0 1rem;
    margin: 0 0 2rem;
    opacity: 0;
    animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;
  }
`

const OrdersList = ({ orders, delay = 0.125 }) => {
  return (
    <OrdersListContainer>
      {orders.map((order, index) => {
        return (
          <OrderListItem
            key={order.order_id}
            delay={`${delay.toFixed(3)}s`}
            // delay={`${((index + 1) * 0.125 + delay).toFixed(3)}s`}
          >
            <OrderCard order={order} />
          </OrderListItem>
        )
      })}
    </OrdersListContainer>
  )
}

OrdersList.displayName = 'OrdersList'
OrdersList.propTypes = {
  orders: propTypes.array,
}

export default OrdersList
