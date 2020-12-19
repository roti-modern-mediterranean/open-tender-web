import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { selectAccountConfig, selectBrand } from '../../../slices'
import {
  Content,
  HeaderButton,
  HeaderMobile,
  Loading,
  Main,
  PageTitle,
  PageContent,
} from '../..'
import { ArrowLeft, Menu } from 'react-feather'
import { ButtonBackToAccount, ButtonLogout } from '../../buttons'
import { Container } from '../..'
import OrdersList from './OrdersList'

const Orders = () => {
  const sectionRef = useRef()
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
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

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
        <title>Recent Orders | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderMobile
          // bgColor="secondary"
          left={
            isBrowser ? (
              <ButtonBackToAccount />
            ) : (
              <HeaderButton onClick={() => history.push('/account')}>
                <ArrowLeft size={20} />
              </HeaderButton>
            )
          }
          right={
            isBrowser ? (
              <ButtonLogout />
            ) : (
              <HeaderButton onClick={() => console.log('clicked')}>
                <Menu size={20} />
              </HeaderButton>
            )
          }
        />
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
