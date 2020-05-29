import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setLocation, selectOrder } from '../slices/orderSlice'
import { Button } from '../packages'
import { serviceTypeNamesMap } from '../packages/utils/constants'
import {
  todayDate,
  formatDateStr,
  formatTimeStr,
} from '../packages/utils/datetimes'
import { selectConfig } from '../slices/configSlice'

const makeOrderMsg = (firstTime, serviceType) => {
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const readableDate =
    firstTime.date === todayDate() ? 'today' : formatDateStr(firstTime.date)
  const formattedTime = formatTimeStr(firstTime.time, 'MMM d')
  const orderMsg = `The first available ${serviceTypeName.toLowerCase()} time is ${readableDate} at ${formattedTime}`
  return orderMsg
}

export const LocationOrder = ({ location, isOrder }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { first_times: firstTimes } = location.settings
  const { locations: locConfig } = useSelector(selectConfig)
  const { statusMessages } = locConfig || {}
  const { serviceType } = useSelector(selectOrder)
  const firstTime = firstTimes[serviceType]
  const statusMessage = statusMessages[location.status]
  const orderMsg =
    !statusMessage && firstTime ? makeOrderMsg(firstTime, serviceType) : null

  const handleOrder = (evt) => {
    evt.preventDefault()
    dispatch(setLocation(location))
    const rcType = location.revenue_center_type.toLowerCase()
    history.push(`/menu/${location.slug}-${rcType}`)
    evt.target.blur()
  }

  const handleChange = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return (
    <div className="location__order">
      {orderMsg ? (
        <>
          <div className="location__order__message">
            <p className="ot-success-color font-size-small">{orderMsg}</p>
          </div>
          {isOrder ? (
            <Button
              text="Order Here"
              ariaLabel={`Order from ${location.name}`}
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
        <div className="location__order__message">
          <p className="ot-error-color font-size-small">{statusMessage}</p>
        </div>
      )}
    </div>
  )
}

LocationOrder.displayName = 'LocationOrder'
LocationOrder.propTypes = {
  location: propTypes.object,
  isOrder: propTypes.bool,
}

export default LocationOrder
