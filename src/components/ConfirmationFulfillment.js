import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectConfirmationOrder,
  selectOrderFulfillment,
  updateOrderFulfillment,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { OrderFulfillmentForm } from '@open-tender/components'

import SectionHeader from './SectionHeader'
import SectionError from './SectionError'
import SectionLoading from './SectionLoading'
import { selectFulfillment } from '../slices'

const title = 'Set your communication preferences'
const subtitle = "Please let us know how you'd like to hear from us"

const ConfirmationFulfillment = () => {
  const dispatch = useDispatch()
  const fulfillmentSettings = useSelector(selectFulfillment)
  const { order_fulfillment, order_id } = useSelector(selectConfirmationOrder)
  const { orderFulfillment, loading, error } = useSelector(
    selectOrderFulfillment
  )
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (orderId, data) => dispatch(updateOrderFulfillment(orderId, data)),
    [dispatch]
  )

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={errMsg} />
          <div className="section__content ot-bg-color-primary ot-border-radius">
            <OrderFulfillmentForm
              orderId={order_id}
              fulfillment={orderFulfillment || order_fulfillment}
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

ConfirmationFulfillment.displayName = 'ConfirmationFulfillment'
export default ConfirmationFulfillment
