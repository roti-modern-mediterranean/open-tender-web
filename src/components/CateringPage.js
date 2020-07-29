import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectOrder,
  setServiceType,
  setRequestedAt,
  resetOrder,
  setOrderServiceType,
  fetchValidTimes,
  selectValidTimes,
} from '@open-tender/redux'
import {
  isoToDate,
  dateToIso,
  timezoneMap,
  getUserTimezone,
  time24ToDate,
  makeLocalDate,
  makeLocalDateStr,
  todayDate,
} from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectConfig } from '../slices'
import Background from './Background'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import PageTitle from './PageTitle'
import iconMap from './iconMap'

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { catering } = useSelector(selectConfig)
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
    if (!hasTypes) {
      dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    }
    dispatch(fetchValidTimes('CATERING'))
  }, [hasTypes, dispatch])

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
    <>
      {isBrowser && <Background imageUrl={catering.background} />}
      <div className="content">
        <PageTitle {...catering} />
        <div className="content__body">
          <div className="container">
            <div className="catering">
              <div className="catering__datepicker">
                {isLoading ? (
                  <Loader type="Clip" text="Loading calendar..." size={28} />
                ) : settings ? (
                  <div className="datepicker-inline ot-font-size-small ot-border ot-border-radius-small ot-bg-color-primary">
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
                      icon={iconMap['RefreshCw']}
                      classes="ot-btn ot-btn--cancel"
                      onClick={startOver}
                    />
                  </ErrorMessage>
                ) : (
                  <p className="ot-color-error">
                    This order type isn't currently available
                  </p>
                )}
              </div>
              <div className="catering__buttons">
                <Button
                  text="Order Delivery"
                  classes="ot-btn"
                  onClick={(evt) => chooseServiceType(evt, 'DELIVERY')}
                  disabled={!date}
                />
                <Button
                  text="Order Pickup"
                  classes="ot-btn"
                  onClick={(evt) => chooseServiceType(evt, 'PICKUP')}
                  disabled={!date}
                />
              </div>
              <div className="catering__footer ot-font-size-small">
                <Button
                  text="Switch to a regular order Pickup or Delivery order"
                  classes="ot-btn-link"
                  onClick={startOver}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content__footer">
          <div className="container">
            <div className="catering__fine-print">
              {catering.policy.title.length > 0 && (
                <p className="catering__fine-print__title ot-heading ot-font-size-h3">
                  {catering.policy.title}
                </p>
              )}
              {catering.policy.subtitle.length > 0 && (
                <p className="catering__fine-print__subtitle ot-heading ot-font-size-big">
                  {catering.policy.title}
                </p>
              )}
              {catering.policy.content.length > 0 && (
                <div className="content__text">
                  <div className="catering__fine-print__content ot-line-height">
                    {catering.policy.content.map((i, index) => (
                      <p key={index}>{i}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
