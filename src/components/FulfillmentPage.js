import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { fetchOrderFulfillment } from '@open-tender/redux'

import { selectConfig, selectFulfillment } from '../slices'
import Background from './Background'
import OrderFulfillment from './OrderFulfillment'

const FulfillmentPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: orderId } = useParams()
  const fulfillment = useSelector(selectFulfillment)
  const { fulfillment: config } = useSelector(selectConfig)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!fulfillment) return history.push('/')
  }, [fulfillment, history])

  useEffect(() => {
    dispatch(fetchOrderFulfillment(orderId))
  }, [dispatch, orderId])

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        <OrderFulfillment orderId={orderId} />
      </div>
    </>
  )
}

FulfillmentPage.displayName = 'FulfillmentPage'
export default FulfillmentPage
