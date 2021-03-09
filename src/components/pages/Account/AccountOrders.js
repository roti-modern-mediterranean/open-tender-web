import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCustomerOrders } from '@open-tender/redux'

import { Loading, OrderCard, PageSection } from '../..'
import { selectConfig } from '../../../slices'

const OrdersView = styled('div')`
  margin: -1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: -0.5rem;
    justify-content: center;
  }
`

const Order = styled('div')`
  width: 33.33333%;
  padding: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 50%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0.5rem;
  }
`

const AccountOrders = () => {
  const { entities: orders, loading, error } = useSelector(selectCustomerOrders)
  const { account } = useSelector(selectConfig)
  const { title, subtitle, empty } = account.recentOrders
  const hasOrders = orders.length > 0 && !error
  const filtered = orders
    .map((i) => ({ ...i, key: i.order_id }))
    .filter((i) => i.order_type !== 'MERCH')
  const displayed = filtered.slice(0, 3)
  const isMore = filtered.length > displayed.length

  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      to={isMore ? '/orders' : null}
    >
      {loading === 'pending' ? (
        <Loading text="Retrieving your recent orders..." />
      ) : hasOrders ? (
        <OrdersView>
          {displayed.map((order) => (
            <Order key={order.order_id}>
              <OrderCard order={order} />
            </Order>
          ))}
        </OrdersView>
      ) : (
        <p>{empty}</p>
      )}
    </PageSection>
  )
}

AccountOrders.displayName = 'AccountOrders'

export default AccountOrders
