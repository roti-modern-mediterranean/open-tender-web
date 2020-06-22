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
  time24ToDate,
  makeLocalDate,
  makeLocalDateStr,
  todayDate,
} from '../packages/utils/datetimes'
import Background from './Background'
import { Button } from '../packages'
import {
  fetchValidTimes,
  selectValidTimes,
} from '../slices/revenueCentersSlice'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

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
  const [date, setDate] = useState(null)
  const [minTime, setMinTime] = useState(new Date())
  const [settings, setSettings] = useState(null)
  const { entity: validTimes, loading, error } = useSelector(selectValidTimes)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!hasTypes) history.push('/')
    dispatch(fetchValidTimes(orderType))
  }, [hasTypes, orderType, dispatch, history])

  useEffect(() => {
    const requestedAtDate =
      !requestedAt || requestedAt === 'asap' ? null : isoToDate(requestedAt, tz)
    if (validTimes) {
      const { first_time, holidays, hours, interval } = validTimes
      const firstDate = isoToDate(first_time.utc, tz)
      const newDate =
        !requestedAtDate || firstDate > requestedAtDate
          ? firstDate
          : requestedAtDate
      setDate(newDate)
      const newSettings = {
        minDate: firstDate,
        minTime: time24ToDate(hours.open),
        maxTime: time24ToDate(hours.close),
        excludeDates: holidays.map((i) => makeLocalDate(i)),
        interval: interval,
      }
      setSettings(newSettings)
    } else {
      setDate(requestedAtDate)
    }
  }, [validTimes, requestedAt, tz])

  useEffect(() => {
    if (settings && date) {
      const dateStr = makeLocalDateStr(date)
      if (dateStr === todayDate()) {
        const newMinTime =
          settings.minDate > settings.minTime
            ? settings.minDate
            : settings.minTime
        setMinTime(newMinTime)
      } else {
        setMinTime(settings.minTime)
      }
    }
  }, [date, settings])

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
          {isLoading ? (
            <Loader type="Clip" text="Loading calendar..." size={28} />
          ) : settings ? (
            <div className="datepicker-inline">
              <DatePicker
                showPopperArrow={false}
                showTimeSelect
                timeCaption="Time"
                timeFormat="h:mm aa"
                dateFormat="yyyy-MM-dd h:mm aa"
                timeIntervals={settings.interval || 15}
                minDate={settings.minDate}
                minTime={minTime || settings.minTime}
                maxTime={settings.maxTime}
                excludeDates={settings.excludeDates}
                // excludeTimes={excludeTimes}
                // filterDate={isClosed}
                selected={date}
                onChange={(date) => setDate(date)}
                inline
                shouldCloseOnSelect={false}
              />
            </div>
          ) : error ? (
            <ErrorMessage msg={error}>
              <Button
                text="Start Over"
                icon="RefreshCw"
                classes="btn btn--error"
                onClick={startOver}
              />
            </ErrorMessage>
          ) : (
            <p className="ot-error-color">
              This order type isn't currently available
            </p>
          )}
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
