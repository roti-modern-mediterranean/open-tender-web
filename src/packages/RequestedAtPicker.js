import React, { useState } from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { isEmpty } from './utils/helpers'
import {
  dateToIso,
  isoToDate,
  makeLocalDate,
  makeWeekdaysExcluded,
  makeDatepickerArgs,
  timezoneMap,
} from './utils/datetimes'
import { errMessages } from './utils/errors'

const RequestedAtPicker = ({
  requestedAt,
  revenueCenter,
  serviceType,
  setRequestedAt,
  updateText = 'Update Order Time',
}) => {
  const { timezone, settings } = revenueCenter
  const tz = timezoneMap[timezone]
  const requestedAtDate =
    requestedAt === 'asap' ? null : isoToDate(requestedAt, tz)
  const [date, setDate] = useState(requestedAtDate)
  const [error, setError] = useState(null)

  const submitDate = (evt) => {
    evt.preventDefault()
    const reqestedAtIso = date ? dateToIso(date, tz) : 'asap'
    setRequestedAt(reqestedAtIso)
    evt.target.blur()
  }

  let args = {}
  if (isEmpty(settings.first_times)) {
    setError(errMessages.revenueCenterClosed)
  } else if (!settings.first_times[serviceType]) {
    setError(errMessages.serviceTypeNotAvailable)
  } else {
    const validTimes = settings.valid_times[serviceType]
    const daysAhead = settings.days_ahead[serviceType]
    const firstMinute = settings.first_times[serviceType].minutes
    const interval = settings.first_times[serviceType].interval
    const holidays = settings.holidays[serviceType].map((i) => makeLocalDate(i))
    const weekdayTimes = makeWeekdaysExcluded(validTimes)
    const excludedTimes = settings.excluded_times[serviceType]
    args = makeDatepickerArgs(
      date,
      weekdayTimes,
      excludedTimes,
      firstMinute,
      interval,
      daysAhead
    )

    if (args.updatedDate) setDate(args.updatedDate)
    args.holidays = holidays
    args.interval = interval
  }
  const { excludeTimes, isClosed, maxDate, holidays, interval } = args

  return (
    <div className="datepicker-inline">
      {error ? (
        <p className="ot-error-color">{error}</p>
      ) : (
        <DatePicker
          showPopperArrow={false}
          showTimeSelect
          timeCaption="Time"
          timeFormat="h:mm aa"
          dateFormat="yyyy-MM-dd h:mm aa"
          minDate={new Date()}
          maxDate={maxDate}
          timeIntervals={interval}
          excludeDates={holidays}
          excludeTimes={excludeTimes}
          filterDate={isClosed}
          selected={date}
          onChange={(date) => setDate(date)}
          inline
          shouldCloseOnSelect={false}
        />
      )}
      <div className="form__submit">
        {!error && (
          <button className="btn" onClick={submitDate}>
            {updateText}
          </button>
        )}
      </div>
    </div>
  )
}

RequestedAtPicker.displayName = 'RequestedAtPicker'
RequestedAtPicker.propTypes = {
  requestedAt: propTypes.string,
  setRequestedAt: propTypes.func,
  revenueCenter: propTypes.object,
}

export default RequestedAtPicker
