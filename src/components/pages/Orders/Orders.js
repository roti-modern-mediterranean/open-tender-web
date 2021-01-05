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
import { ButtonStyled, ButtonToggleGroup } from '@open-tender/components'
import { makeUniqueDisplayItems } from '@open-tender/js'

import { selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Container,
  Content,
  Loading,
  Main,
  PageTitle,
  PageContent,
  HeaderAccount,
  ItemCards,
  OrderCardItem,
} from '../..'
import OrdersList from './OrdersList'

const ToggleView = styled('div')`
  margin: -1rem 0 3rem;
`

const Orders = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const increment = 20
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

  useEffect(() => {
    windowRef.current.scrollTop = 0
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
        <HeaderAccount title={isBrowser ? null : 'Order History'} />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.recentOrders} />
            <PageContent>
              {recentOrders.length ? (
                <>
                  <ToggleView>
                    <ButtonToggleGroup>
                      <ButtonStyled
                        onClick={() => setToggle('orders')}
                        disabled={toggle === 'orders'}
                      >
                        Recent Orders
                      </ButtonStyled>
                      <ButtonStyled
                        onClick={() => setToggle('items')}
                        disabled={toggle === 'items'}
                      >
                        Recent Items
                      </ButtonStyled>
                    </ButtonToggleGroup>
                  </ToggleView>
                  {toggle === 'orders' ? (
                    <>
                      <OrdersList orders={recentOrders} delay={0} />
                      {entities.length - 1 > count && (
                        <ButtonStyled onClick={loadMore}>
                          Load more recent orders
                        </ButtonStyled>
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
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>Looks like you don't have any orders yet</p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Orders.displayName = 'Orders'
export default Orders
