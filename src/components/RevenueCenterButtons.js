import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setOrderServiceType,
  setAddress,
  resetRevenueCenter,
  setRevenueCenter,
} from '../slices/orderSlice'
import { Button } from '../packages'

export const RevenueCenterButtons = ({ revenueCenter }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    slug,
    settings,
    revenue_center_type,
    is_outpost,
    address,
  } = revenueCenter
  const { first_times: ft, order_times: ot } = settings
  const menuSlug = `/menu/${slug}-${revenue_center_type.toLowerCase()}`
  const hasPickup = (ft && ft.PICKUP) || (ot && ot.PICKUP)
  const hasDelivery = (ft && ft.DELIVERY) || (ot && ot.DELIVERY)

  const handlePickup = (evt) => {
    evt.preventDefault()
    // const serviceType = is_outpost && ot.PICKUP ? 'OUTPOST' : 'PICKUP'
    const serviceType = is_outpost ? 'OUTPOST' : 'PICKUP'
    dispatch(setAddress(null))
    dispatch(setOrderServiceType([revenue_center_type, serviceType]))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
    evt.target.blur()
  }

  const handleDelivery = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType([revenue_center_type, 'DELIVERY']))
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
          text="Order Pickup"
          ariaLabel={`Order Pickup from ${revenueCenter.name}`}
          icon="ShoppingBag"
          onClick={handlePickup}
        />
      )}
      {hasDelivery && (
        <Button
          text="Order Delivery"
          ariaLabel={`Order Delivery from ${revenueCenter.name}`}
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
