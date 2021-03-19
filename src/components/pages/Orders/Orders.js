import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { makeUniqueDisplayItems } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  HeaderDefault,
  ItemCards,
  Loading,
  Main,
  MoreLink,
  OrderCardItem,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
} from '../..'
import OrdersList from './OrdersList'
import AccountTabs from '../Account/AccountTabs'
import { ButtonToggle } from '../../buttons'

const ToggleView = styled('div')`
  display: flex;
  width: 40rem;
  max-width: 100%;
  margin: 0 -0.6rem;

  & > div {
    width: 50%;
    padding: 0 0.6rem;
  }
`

const OrdersLoadMore = styled('div')`
  display: flex;
  justify-content: flex-end;
`

const Orders = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const increment = 15
  const limit = 60
  const [toggle, setToggle] = useState('orders')
  const [count, setCount] = useState(increment)
  const [items, setItems] = useState([])
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders
  const [recentOrders, setRecentOrders] = useState(entities.slice(0, count))
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)
  console.log(items)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerOrders(limit + 1))
  }, [dispatch])

  useEffect(() => {
    setRecentOrders(entities.slice(0, count))
  }, [entities, count])

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    const recentItems = displayItems.slice(0, 100)
    setItems(recentItems)
  }, [entities])

  const loadMore = () => {
    setCount(Math.min(count + increment, limit))
  }

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>Order History | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageContainer>
            <PageTitle {...config.recentOrders}>
              {recentOrders.length > 0 && (
                <ToggleView>
                  <ButtonToggle
                    disabled={toggle === 'orders'}
                    onClick={() => setToggle('orders')}
                  >
                    Recent Orders
                  </ButtonToggle>
                  <ButtonToggle
                    disabled={toggle === 'items'}
                    onClick={() => setToggle('items')}
                  >
                    Recent Items
                  </ButtonToggle>
                </ToggleView>
              )}
            </PageTitle>
            <PageError error={error} />
            {recentOrders.length ? (
              <>
                {toggle === 'orders' ? (
                  <>
                    <OrdersList orders={recentOrders} delay={0} />
                    {entities.length - 1 > count && (
                      <OrdersLoadMore>
                        <MoreLink onClick={loadMore} text="Load more" />
                      </OrdersLoadMore>
                    )}
                  </>
                ) : (
                  <ItemCards
                    items={items}
                    delay={0}
                    renderItem={(props) => <OrderCardItem {...props} />}
                  />
                )}
              </>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your order history..." />
                ) : (
                  <p>Looks like you don't have any orders yet.</p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Orders.displayName = 'Orders'
export default Orders
