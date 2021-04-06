import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { fetchCustomerOrders, selectCustomerOrders } from '@open-tender/redux'

import { Loading, OrderCard, PageContent, PageSection } from '../..'
import { selectConfig } from '../../../slices'

const OrdersView = styled('div')`
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

const Order = styled('div')`
  width: 33.33333%;
  padding: 0 1.2rem 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 50%;
    &:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 0 1.2rem;
    max-width: 40rem;
    // &:nth-child(3) {
    //   display: block;
    // }
  }
`

const HomeRecentOrders = ({ style }) => {
  const dispatch = useDispatch()
  const { entities: orders, loading, error } = useSelector(selectCustomerOrders)
  const { account } = useSelector(selectConfig)
  const { title, subtitle, empty } = account.recentOrders
  const hasOrders = orders.length > 0 && !error
  const filtered = orders
    .map((i) => ({ ...i, key: i.order_id }))
    .filter((i) => i.order_type !== 'MERCH')
  const displayed = filtered.slice(0, 3)
  const isMore = filtered.length > displayed.length
  const isLoading = loading === 'pending'

  useEffect(() => {
    dispatch(fetchCustomerOrders(20))
  }, [dispatch])

  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      to={isMore ? '/orders' : null}
      style={style}
    >
      {isLoading ? (
        <PageContent style={{ margin: '0 auto' }}>
          <Loading text="Retrieving your recent orders..." />
        </PageContent>
      ) : hasOrders ? (
        <OrdersView>
          {displayed.map((order) => (
            <Order key={order.order_id}>
              <OrderCard order={order} />
            </Order>
          ))}
        </OrdersView>
      ) : (
        <PageContent style={{ margin: '0 auto' }}>
          <div>
            <p>{empty}</p>
          </div>
        </PageContent>
      )}
    </PageSection>
  )
}

HomeRecentOrders.displayName = 'HomeRecentOrders'
HomeRecentOrders.propTypes = {
  style: propTypes.object,
}

export default HomeRecentOrders
