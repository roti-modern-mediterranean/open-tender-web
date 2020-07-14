import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeRevenueCenterMsg } from '@open-tender/js'
import {
  setRevenueCenter,
  selectOrder,
  selectAutoSelect,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { selectConfig } from '../slices'
import RevenueCenterButtons from './RevenueCenterButtons'
import iconMap from './iconMap'

export const RevenueCenterOrder = ({ revenueCenter, isOrder, isLanding }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { serviceType } = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const msg = makeRevenueCenterMsg(revenueCenter, serviceType, statusMessages)
  const { name, slug, revenue_center_type, is_outpost } = revenueCenter

  const handleOrder = (evt) => {
    evt.preventDefault()
    dispatch(setRevenueCenter(revenueCenter))
    const rcType = revenue_center_type.toLowerCase()
    history.push(`/menu/${slug}-${rcType}`)
    evt.target.blur()
  }

  const handleChange = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return (
    <div className="rc__order">
      {msg.message && (
        <div className="rc__order__message">
          <p className={`ot-font-size-small ${msg.className}`}>{msg.message}</p>
        </div>
      )}
      {isLanding ? (
        <RevenueCenterButtons revenueCenter={revenueCenter} />
      ) : isOrder && is_outpost ? (
        <RevenueCenterButtons revenueCenter={revenueCenter} />
      ) : isOrder ? (
        <div className="rc__order__buttons">
          <Button
            text="Order Here"
            ariaLabel={`Order from ${name}`}
            icon={iconMap['ShoppingBag']}
            onClick={handleOrder}
          />
        </div>
      ) : !autoSelect ? (
        <div className="rc__order__buttons">
          <Button
            text="Change Location"
            icon={iconMap['RefreshCw']}
            onClick={handleChange}
          />
        </div>
      ) : null}
    </div>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
  isOrder: propTypes.bool,
}

export default RevenueCenterOrder
