import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectServiceType,
  setOrderServiceType,
  setAddress,
  resetRevenueCenter,
  setRevenueCenter,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from './iconMap'

export const RevenueCenterButtons = ({ revenueCenter, isLanding }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    name,
    slug,
    settings,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
  } = revenueCenter
  const { first_times: ft, order_times: ot } = settings
  const menuSlug = `/menu/${slug}`
  const serviceType = useSelector(selectServiceType)
  const serviceTypes =
    isLanding || isOutpost ? ['PICKUP', 'DELIVERY'] : [serviceType]
  const hasPickup =
    ((ft && ft.PICKUP) || (ot && ot.PICKUP)) && serviceTypes.includes('PICKUP')
  const hasDelivery =
    ((ft && ft.DELIVERY) || (ot && ot.DELIVERY)) &&
    serviceTypes.includes('DELIVERY')

  const handlePickup = (evt) => {
    evt.preventDefault()
    dispatch(setAddress(null))
    dispatch(setOrderServiceType(rcType, 'PICKUP', isOutpost))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
    evt.target.blur()
  }

  const handleDelivery = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType(rcType, 'DELIVERY', isOutpost))
    if (isLanding) {
      dispatch(resetRevenueCenter())
      history.push('/locations')
    } else {
      if (isOutpost) dispatch(setAddress(address))
      dispatch(setRevenueCenter(revenueCenter))
      history.push(menuSlug)
    }
    evt.target.blur()
  }

  return (
    <div className="rc__order__buttons">
      {hasPickup && (
        <Button
          text={`Order ${hasDelivery ? 'Pickup' : 'Here'}`}
          ariaLabel={`Order Pickup from ${name}`}
          icon={iconMap['ShoppingBag']}
          onClick={handlePickup}
        />
      )}
      {hasDelivery && (
        <Button
          text="Order Delivery"
          ariaLabel={`Order Delivery from ${name}`}
          icon={iconMap['Truck']}
          onClick={handleDelivery}
        />
      )}
    </div>
  )
}

RevenueCenterButtons.displayName = 'RevenueCenterButtons'
RevenueCenterButtons.propTypes = {
  revenueCenter: propTypes.object,
}

export default RevenueCenterButtons
