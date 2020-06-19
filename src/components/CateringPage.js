import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../slices/configSlice'
import {
  selectOrder,
  setServiceType,
  setRequestedAt,
  resetOrder,
} from '../slices/orderSlice'
import {
  isoToDate,
  dateToIso,
  timezoneMap,
  getUserTimezone,
} from '../packages/utils/datetimes'
import Background from './Background'
import { Button } from '../packages'

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { catering: cateringConfig } = useSelector(selectConfig)
  const { title, subtitle, content, background } = cateringConfig
  const { orderType, serviceType, requestedAt, revenueCenter } = useSelector(
    selectOrder
  )
  const hasTypes = orderType && serviceType
  const { timezone } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : getUserTimezone()
  const requestedAtDate =
    !requestedAt || requestedAt === 'asap' ? null : isoToDate(requestedAt, tz)
  const [date, setDate] = useState(requestedAtDate)
  const interval = 15
  const minDate = new Date()

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  const chooseServiceType = (evt, serviceType) => {
    evt.preventDefault()
    dispatch(setServiceType(serviceType))
    const reqestedAtIso = date ? dateToIso(date, tz) : 'asap'
    dispatch(setRequestedAt(reqestedAtIso))
    history.push('/locations')
    evt.target.blur()
  }

  const startOver = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    history.push(`/`)
    evt.target.blur()
  }

  return (
    <div className="content">
      <Background imageUrl={background} />
      <div className="card overlay border-radius slide-up">
        <div className="card__header">
          <p className="preface font-size-small secondary-color">{subtitle}</p>
          <h1 className="ot-font-size-h3">{title}</h1>
          <p className="secondary-color">{content}</p>
        </div>
        <div className="card__content">
          <div className="datepicker-inline">
            <DatePicker
              showPopperArrow={false}
              showTimeSelect
              timeCaption="Time"
              timeFormat="h:mm aa"
              dateFormat="yyyy-MM-dd h:mm aa"
              minDate={minDate}
              timeIntervals={interval}
              // excludeDates={holidays}
              // excludeTimes={excludeTimes}
              // filterDate={isClosed}
              selected={date}
              onChange={(date) => setDate(date)}
              inline
              shouldCloseOnSelect={false}
            />
          </div>
          <div className="card__content__buttons">
            <Button
              text="Order Delivery"
              classes="btn"
              onClick={(evt) => chooseServiceType(evt, 'DELIVERY')}
              disabled={!date}
            />
            <Button
              text="Order Pickup"
              classes="btn"
              onClick={(evt) => chooseServiceType(evt, 'PICKUP')}
              disabled={!date}
            />
          </div>
          <div className="card__content__footer font-size-small">
            <Button
              text="Switch to a regular order Pickup or Delivery order"
              classes="btn-link"
              onClick={startOver}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
