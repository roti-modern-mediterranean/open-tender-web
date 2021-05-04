import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import {
  selectOrderFulfillment,
  updateOrderFulfillment,
  resetOrderFulfillment,
  fetchRevenueCenter,
  selectRevenueCenter,
} from '@open-tender/redux'
import { timezoneMap } from '@open-tender/js'

import { selectFulfillment } from '../slices'
import { FormHeader, FormWrapper } from './inputs'
import { OrderFulfillmentForm } from './forms'
import { Loading, RevenueCenter } from '.'
import CheckoutOrderTime from './pages/CheckoutDetails/CheckoutOrderTime'

const OrderFulfillmentRevenueCenter = styled('div')`
  padding: 1.5rem 2rem 2rem;
  margin: 0 0 1rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const OrderFulfillment = ({ order }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const {
    order_id,
    revenue_center,
    order_fulfillment = {},
    service_type,
    requested_at,
    timezone,
  } = order
  const tz = timezoneMap[timezone]
  const { revenue_center_id } = revenue_center
  const fulfillmentSettings = useSelector(selectFulfillment)
  const revenueCenter = useSelector(selectRevenueCenter)
  const { orderFulfillment, loading, error } = useSelector(
    selectOrderFulfillment
  )
  const fulfillment = orderFulfillment || order_fulfillment || {}
  const update = useCallback(
    (orderId, data) => dispatch(updateOrderFulfillment(orderId, data)),
    [dispatch]
  )

  useEffect(() => {
    dispatch(fetchRevenueCenter(revenue_center_id))
  }, [dispatch, revenue_center_id])

  useEffect(() => {
    return () => dispatch(resetOrderFulfillment())
  }, [dispatch])

  return (
    <FormWrapper>
      <FormHeader>
        <h2>{fulfillmentSettings.title}</h2>
        <p>{fulfillmentSettings.description}</p>
      </FormHeader>
      {revenueCenter ? (
        <OrderFulfillmentRevenueCenter>
          <RevenueCenter revenueCenter={revenueCenter} type="div" />
        </OrderFulfillmentRevenueCenter>
      ) : (
        <Loading type="Puff" size={60} color={theme.colors.light} />
      )}
      <CheckoutOrderTime
        serviceType={service_type}
        requestedAt={requested_at}
        tz={tz}
      />
      <OrderFulfillmentForm
        orderId={order_id}
        fulfillment={fulfillment}
        loading={loading}
        error={error}
        update={update}
        settings={fulfillmentSettings}
        showAllFields={true}
      />
    </FormWrapper>
  )
}

OrderFulfillment.displayName = 'OrderFulfillment'
OrderFulfillment.propTypes = {
  orderId: propTypes.number,
  order_fulfillment: propTypes.object,
}

export default OrderFulfillment
