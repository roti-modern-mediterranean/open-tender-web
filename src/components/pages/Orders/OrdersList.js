import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { OrderCard, OrderCardGroup } from '../..'

const OrdersListView = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -1.2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
`
const OrdersListItem = styled('div')`
  width: 33.33333%;
  padding: 0 1.2rem 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 0 1.2rem;
    max-width: 40rem;
  }
`

const OrdersList = ({ orders, isGroup = false }) => {
  return (
    <OrdersListView>
      {orders.map((order) => {
        return (
          <OrdersListItem key={order.order_id || order.token}>
            {isGroup ? (
              <OrderCardGroup order={order} />
            ) : (
              <OrderCard order={order} />
            )}
          </OrdersListItem>
        )
      })}
    </OrdersListView>
  )
}

OrdersList.displayName = 'OrdersList'
OrdersList.propTypes = {
  orders: propTypes.array,
  delay: propTypes.number,
}

export default OrdersList
