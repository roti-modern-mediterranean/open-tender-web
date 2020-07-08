import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setOrderServiceType,
  setAddress,
  resetRevenueCenter,
  setRevenueCenter,
} from '@open-tender/redux'
import { Button } from 'open-tender'

export const RevenueCenterButtons = ({ revenueCenter }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    name,
    slug,
    settings,
    revenue_center_type: rcType,
    is_outpost,
    address,
  } = revenueCenter
  const { first_times: ft, order_times: ot } = settings
  const menuSlug = `/menu/${slug}-${rcType.toLowerCase()}`
  const hasPickup = (ft && ft.PICKUP) || (ot && ot.PICKUP)
  const hasDelivery = (ft && ft.DELIVERY) || (ot && ot.DELIVERY)

  const handlePickup = (evt) => {
    evt.preventDefault()
    dispatch(setAddress(null))
    dispatch(setOrderServiceType(rcType, 'PICKUP', is_outpost))
    dispatch(setRevenueCenter(revenueCenter))
    if (is_outpost) {
      dispatch(setAddress(address))
    }
    history.push(menuSlug)
    evt.target.blur()
  }

  const handleDelivery = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType(rcType, 'DELIVERY', is_outpost))
    if (is_outpost) {
      dispatch(setAddress(address))
      dispatch(setRevenueCenter(revenueCenter))
      history.push(menuSlug)
    } else {
      dispatch(resetRevenueCenter())
      history.push('/locations')
    }
    evt.target.blur()
  }

  return (
    <div className="rc__order">
      {hasPickup && (
        <Button
          text={`Order ${hasDelivery ? 'Pickup' : 'Here'}`}
          ariaLabel={`Order Pickup from ${name}`}
          icon="ShoppingBag"
          onClick={handlePickup}
        />
      )}
      {hasDelivery && (
        <Button
          text="Order Delivery"
          ariaLabel={`Order Delivery from ${name}`}
          icon="Truck"
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
