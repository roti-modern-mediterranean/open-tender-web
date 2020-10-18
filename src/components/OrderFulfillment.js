import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrderFulfillment,
  updateOrderFulfillment,
  resetOrderFulfillment,
} from '@open-tender/redux'
import { OrderFulfillmentForm } from '@open-tender/components'

import SectionHeader from './SectionHeader'
import SectionError from './SectionError'
import SectionLoading from './SectionLoading'
import { selectFulfillment } from '../slices'

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
    <div id="order-fulfillment" className="section slide-up">
      <div className="container">
        <div className="section__container">
          <SectionHeader
            title={fulfillmentSettings.title}
            subtitle={subtitle}
          />
          <SectionLoading loading={isLoading} />
          <SectionError error={errMsg} />
          <div className="section__content ot-bg-color-primary ot-border-radius">
            <OrderFulfillmentForm
              orderId={orderId}
              fulfillment={fulfillment}
              loading={loading}
              error={error}
              update={update}
              settings={fulfillmentSettings}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

OrderFulfillment.displayName = 'OrderFulfillment'
OrderFulfillment.propTypes = {
  orderId: propTypes.number,
  order_fulfillment: propTypes.object,
}

export default OrderFulfillment
