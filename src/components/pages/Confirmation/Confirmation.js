import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetConfirmation,
  resetGroupOrder,
  resetOrderFulfillment,
} from '@open-tender/redux'

import { selectBrand, selectConfig, selectOptIns } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  Main,
  Order,
  OrderFulfillment,
  PageTitle,
  PageContent,
  HeaderDefault,
} from '../..'
import ConfirmationProfile from './ConfirmationProfile'
import ConfirmationLinks from './ConfirmationLinks'

const Confirmation = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { confirmation: config } = useSelector(selectConfig)
  const brand = useSelector(selectBrand)
  const order = useSelector(selectConfirmationOrder)
  const { order_fulfillment, order_id, revenue_center, service_type } =
    order || {}
  const { auth, profile } = useSelector(selectCustomer)
  const isNew = auth && profile && profile.order_notifications === 'NEW'
  const optIns = useSelector(selectOptIns)
  const { accepts_marketing, order_notifications } = optIns
  const showOptIns = isNew && (accepts_marketing || order_notifications)
  const hasFulfillment =
    brand.fulfillment &&
    revenue_center &&
    revenue_center.has_order_fulfillment &&
    service_type === 'PICKUP'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
  }, [windowRef])

  useEffect(() => {
    if (!order) history.push(auth ? '/account' : '/')
    dispatch(resetGroupOrder())
    return () => {
      dispatch(resetConfirmation())
    }
  }, [order, auth, dispatch, history])

  useEffect(() => {
    if (!hasFulfillment) dispatch(resetOrderFulfillment())
  }, [hasFulfillment, dispatch])

  return (
    <>
      <Helmet>
        <title>Confirmation | {brand.title}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault
          title={isBrowser ? null : 'Confirmation'}
          isLogo={false}
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config} />
            <PageContent>
              {showOptIns && <ConfirmationProfile />}
              {hasFulfillment && (
                <OrderFulfillment
                  orderId={order_id}
                  order_fulfillment={order_fulfillment}
                />
              )}
              <ConfirmationLinks auth={auth} brand={brand} />
              <Order order={order} isConfirmation={true} />
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Confirmation.displayName = 'Confirmation'
export default Confirmation
