import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import { fetchOrderFulfillment } from '@open-tender/redux'

import { selectBrand, selectConfig, selectFulfillment } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  HeaderDefault,
  Main,
  OrderFulfillment,
  PageContent,
} from '../..'

const Fulfillment = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: orderId } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const { fulfillment: config } = useSelector(selectConfig)
  const fulfillment = useSelector(selectFulfillment)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (!fulfillment) return history.push('/')
  }, [fulfillment, history])

  useEffect(() => {
    dispatch(fetchOrderFulfillment(orderId))
  }, [dispatch, orderId])

  return (
    <>
      <Helmet>
        <title>Curbside Pickup | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : 'Curbside Pickup'} />
        <Main bgColor="secondary">
          <Container>
            <PageContent>
              <div style={{ margin: '4rem 0 0' }}>
                <OrderFulfillment orderId={orderId} />
              </div>
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Fulfillment.displayName = 'Fulfillment'
export default Fulfillment
