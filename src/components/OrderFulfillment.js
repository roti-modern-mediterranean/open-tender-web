import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrderFulfillment,
  updateOrderFulfillment,
  resetOrderFulfillment,
} from '@open-tender/redux'
import { ErrorMessage, OrderFulfillmentForm } from '@open-tender/components'

import { selectFulfillment } from '../slices'
import { Loading } from '.'
import styled from '@emotion/styled'

const OrderFulfillmentView = styled('div')`
  margin: 4rem 0 2rem;

  h2 + p {
    margin: 0.5rem 0 0;
  }
`

const OrderFulfillment = ({ orderId, order_fulfillment = {} }) => {
  const dispatch = useDispatch()
  const fulfillmentSettings = useSelector(selectFulfillment)
  const { orderFulfillment, loading, error } = useSelector(
    selectOrderFulfillment
  )
  const fulfillment = orderFulfillment || order_fulfillment || {}
  const empty = Object.values(fulfillment).every((i) => !i)
  const arrivalInfo = fulfillmentSettings.fields.find(
    (i) => i.name === 'arrival_info'
  )
  const subtitle = empty
    ? fulfillmentSettings.description
    : arrivalInfo
    ? `Please submit your ${arrivalInfo.label.toLowerCase()} below to let us know when you've arrived`
    : 'Please let us know when you arrive'
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (orderId, data) => dispatch(updateOrderFulfillment(orderId, data)),
    [dispatch]
  )

  useEffect(() => {
    return () => dispatch(resetOrderFulfillment())
  }, [dispatch])

  return (
    <OrderFulfillmentView id="order-fulfillment">
      {isLoading ? (
        <Loading text="Retrieving your order..." />
      ) : errMsg ? (
        <ErrorMessage>{errMsg}</ErrorMessage>
      ) : (
        <>
          <div style={{ margin: '0 0 2rem' }}>
            <h2>{fulfillmentSettings.title}</h2>
            <p>{subtitle}</p>
          </div>
          <OrderFulfillmentForm
            orderId={orderId}
            fulfillment={fulfillment}
            loading={loading}
            error={error}
            update={update}
            settings={fulfillmentSettings}
          />
        </>
      )}
    </OrderFulfillmentView>
  )
}

OrderFulfillment.displayName = 'OrderFulfillment'
OrderFulfillment.propTypes = {
  orderId: propTypes.number,
  order_fulfillment: propTypes.object,
}

export default OrderFulfillment
