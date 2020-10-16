import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrderFulfillment } from '@open-tender/redux'

import { selectFulfillment } from '../slices'
import AccountBackground from './AccountBackground'
import OrderFulfillment from './OrderFulfillment'

const FulfillmentPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: orderId } = useParams()
  const fulfillment = useSelector(selectFulfillment)

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
      <AccountBackground />
      <div className="content">
        <OrderFulfillment orderId={orderId} />
      </div>
    </>
  )
}

FulfillmentPage.displayName = 'FulfillmentPage'
export default FulfillmentPage
