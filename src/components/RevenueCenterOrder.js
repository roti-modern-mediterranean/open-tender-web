import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setRevenueCenter,
  selectOrder,
  selectAutoSelect,
} from '../slices/orderSlice'
import { Button } from '../packages'
import {
  serviceTypeNamesMap,
  menuServiceTypeMap,
} from '../packages/utils/constants'
import {
  makeReadableDateStrFromIso,
  timezoneMap,
  makeOrderTimes,
} from '../packages/utils/datetimes'
import { selectConfig } from '../slices/configSlice'
import RevenueCenterButtons from './RevenueCenterButtons'

const makeOrderMsg = (firstTime, orderTime, tz, serviceType) => {
  if (!firstTime && !orderTime) return null
  let firstIso
  if (firstTime) {
    firstIso = firstTime.utc
  } else {
    const orderTimes = makeOrderTimes(orderTime)
    firstIso = orderTimes[0].iso
  }
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const readableDate = makeReadableDateStrFromIso(firstIso, tz, true)
  const orderMsg = `The first available ${serviceTypeName.toLowerCase()} time is ${readableDate}`
  return orderMsg
}

export const RevenueCenterOrder = ({ revenueCenter, isOrder, isLanding }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { first_times, order_times } = revenueCenter.settings
  const tz = timezoneMap[revenueCenter.timezone]
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const { serviceType } = useSelector(selectOrder)
  const menuServiceType = menuServiceTypeMap[serviceType]
  const firstTime = first_times ? first_times[menuServiceType] : null
  const orderTime = order_times ? order_times[menuServiceType] : null
  const statusMsg = statusMessages[revenueCenter.status]
  const orderMsg =
    !statusMsg && (firstTime || orderTime)
      ? makeOrderMsg(firstTime, orderTime, tz, menuServiceType)
      : null
  const msg =
    orderMsg ||
    (statusMsg
      ? statusMsg.msg
      : 'This location is not currently accepting orders')
  const msgClass = orderMsg ? 'ot-success-color' : 'ot-alert-color'
  const autoSelect = useSelector(selectAutoSelect)

  const handleOrder = (evt) => {
    evt.preventDefault()
    dispatch(setRevenueCenter(revenueCenter))
    const rcType = revenueCenter.revenue_center_type.toLowerCase()
    history.push(`/menu/${revenueCenter.slug}-${rcType}`)
    evt.target.blur()
  }

  const handleChange = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return (
    <div className="rc__order">
      {msg && (
        <div className="rc__order__message">
          <p className={`font-size-small ${msgClass}`}>{msg}</p>
        </div>
      )}
      {isLanding ? (
        <RevenueCenterButtons revenueCenter={revenueCenter} />
      ) : isOrder ? (
        <Button
          text="Order Here"
          ariaLabel={`Order from ${revenueCenter.name}`}
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
