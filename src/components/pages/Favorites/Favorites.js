import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectCustomerFavorites,
  fetchCustomerFavorites,
  selectCustomerOrders,
  fetchMenuItems,
} from '@open-tender/redux'
import { getLastOrder, makeDisplayItem } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Container,
  Content,
  ItemCards,
  Loading,
  Main,
  PageTitle,
  PageContent,
  HeaderAccount,
  OrderCardItem,
  PageError,
} from '../..'

const Favorites = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { entities, loading, error } = useSelector(selectCustomerFavorites)
  const { entities: orders } = useSelector(selectCustomerOrders)
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  const [favorites, setFavorites] = useState(entities)
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const items = favorites.map((i) => ({ ...i.item }))
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  useEffect(() => {
    dispatch(fetchCustomerFavorites())
  }, [dispatch])

  useEffect(() => {
    const favs = entities.map((i) => ({ ...i, item: makeDisplayItem(i.item) }))
    setFavorites(favs)
  }, [entities])

  useEffect(() => {
    if (lastOrder) {
      const { revenue_center, service_type: serviceType } = lastOrder
      const { revenue_center_id: revenueCenterId } = revenue_center
      dispatch(fetchMenuItems({ revenueCenterId, serviceType }))
    }
  }, [lastOrder, dispatch])

  return auth ? (
    <>
      <Helmet>
        <title>Order History | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderAccount title={isBrowser ? null : 'Favorites'} />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.favorites} />
            <PageContent>
              <PageError error={error} />
              {items.length ? (
                <ItemCards
                  items={items}
                  delay={0}
                  sequential={false}
                  renderItem={(props) => <OrderCardItem {...props} />}
                />
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
              ) : (
                <p>
                  Looks like you don't have any favorites yet. Visit your past
                  orders to add some.
                </p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  ) : null
}

Favorites.displayName = 'Favorites'
export default Favorites
