import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeRevenueCenterMsg } from 'open-tender-js'
import {
  setRevenueCenter,
  selectOrder,
  selectAutoSelect,
} from '../slices/orderSlice'
import { selectConfig } from '../slices/configSlice'
// import { Button } from '../packages'
import { Button } from 'open-tender'
import RevenueCenterButtons from './RevenueCenterButtons'

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
          <p className={`font-size-small ${msg.className}`}>{msg.message}</p>
        </div>
      )}
      {isLanding ? (
        <RevenueCenterButtons revenueCenter={revenueCenter} />
      ) : isOrder && is_outpost ? (
        <RevenueCenterButtons revenueCenter={revenueCenter} />
      ) : isOrder ? (
        <Button
          text="Order Here"
          ariaLabel={`Order from ${name}`}
          icon="ShoppingBag"
          onClick={handleOrder}
        />
      ) : !autoSelect ? (
        <Button
          text="Change Location"
          icon="RefreshCw"
          onClick={handleChange}
        />
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
