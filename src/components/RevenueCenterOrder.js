import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setRevenueCenter, selectOrder } from '../slices/orderSlice'
import { Button } from '../packages'
import { serviceTypeNamesMap } from '../packages/utils/constants'
import {
  makeReadableDateStrFromIso,
  timezoneMap,
} from '../packages/utils/datetimes'
import { selectConfig } from '../slices/configSlice'

const makeOrderMsg = (firstTime, tz, serviceType) => {
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const readableDate = makeReadableDateStrFromIso(firstTime.utc, tz, true)
  const orderMsg = `The first available ${serviceTypeName.toLowerCase()} time is ${readableDate.toLowerCase()}`
  return orderMsg
}

export const RevenueCenterOrder = ({ revenueCenter, isOrder }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { first_times: firstTimes } = revenueCenter.settings
  const tz = timezoneMap[revenueCenter.timezone]
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const { serviceType } = useSelector(selectOrder)
  const firstTime = firstTimes[serviceType]
  const statusMessage = statusMessages[revenueCenter.status]
  const orderMsg =
    !statusMessage && firstTime
      ? makeOrderMsg(firstTime, tz, serviceType)
      : null

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
      {orderMsg ? (
        <>
          <div className="rc__order__message">
            <p className="ot-success-color font-size-small">{orderMsg}</p>
          </div>
          {isOrder ? (
            <Button
              text="Order Here"
              ariaLabel={`Order from ${revenueCenter.name}`}
              icon="ShoppingBag"
              onClick={handleOrder}
            />
          ) : (
            <Button
              text="Change Location"
              icon="RefreshCw"
              onClick={handleChange}
            />
          )}
        </>
      ) : (
        <>
          <div className="rc__order__message">
            <p className="ot-error-color font-size-small">{statusMessage}</p>
          </div>
          {!isOrder && (
            <Button
              text="Change Location"
              icon="RefreshCw"
              onClick={handleChange}
            />
          )}
        </>
      )}
    </div>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
  isOrder: propTypes.bool,
}

export default RevenueCenterOrder
