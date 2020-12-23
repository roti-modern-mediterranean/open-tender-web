import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { selectAccountConfig, selectBrand } from '../../../slices'
import {
  Container,
  Content,
  Loading,
  Main,
  PageTitle,
  PageContent,
  HeaderAccount,
} from '../..'
import OrdersList from './OrdersList'

const Orders = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const increment = 20
  const limit = 60
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders
  const [count, setCount] = useState(increment)
  const [recentOrders, setRecentOrders] = useState(entities.slice(0, count))
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerOrders(limit + 1))
  }, [dispatch])

  useEffect(() => {
    setRecentOrders(entities.slice(0, count))
  }, [entities, count])

  const handleClick = (evt) => {
    evt.preventDefault()
    setCount(Math.min(count + increment, limit))
    evt.target.blur()
  }

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>Order History | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderAccount title="Order History" />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.recentOrders} />
            <PageContent>
              {recentOrders.length ? (
                <>
                  <OrdersList orders={recentOrders} />
                  {entities.length - 1 > count && (
                    <Button classes="ot-btn" onClick={handleClick}>
                      Load more recent orders
                    </Button>
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
