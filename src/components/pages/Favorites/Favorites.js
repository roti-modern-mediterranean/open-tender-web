import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
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
  Content,
  HeaderDefault,
  ItemCards,
  Loading,
  Main,
  OrderCardItem,
  PageError,
  PageContainer,
  PageTitle,
} from '../..'
import { CardActiveContext } from '../Orders/Orders'

const Favorites = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [activeCard, setActiveCard] = useState(null)
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
        <HeaderDefault />
        <Main>
          <PageContainer>
            <PageTitle {...config.favorites} />
            <PageError error={error} />
            {items.length ? (
              <CardActiveContext.Provider
                value={{
                  activeCard,
                  setActiveCard,
                }}
              >
                <ItemCards
                  items={items}
                  delay={0}
                  sequential={false}
                  renderItem={(props) => <OrderCardItem {...props} />}
                />
              </CardActiveContext.Provider>
            ) : isLoading ? (
              <Loading text="Retrieving your favorites..." />
            ) : (
              <p>
                Looks like you don't have any favorites yet. Please visit the
                Recent Orders page to add some.
              </p>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

Favorites.displayName = 'Favorites'
export default Favorites
