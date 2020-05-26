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
  location,
  serviceType,
  setRequestedAt,
  cancel,
  updateText = 'Update Order Time',
  cancelText = 'Cancel',
}) => {
  const { timezone, settings } = location
  const tz = timezoneMap[timezone]
  const requestedAtDate =
    requestedAt === 'asap' ? null : isoToDate(requestedAt, tz)
  const [date, setDate] = useState(requestedAtDate)
  const [error, setError] = useState(null)

  const submitDate = () => {
    const reqestedAtIso = dateToIso(date, tz)
    setRequestedAt(reqestedAtIso)
  }

  if (isEmpty(settings.first_times)) {
    setError(errMessages.locationClosed)
  } else if (!settings.first_times[serviceType]) {
    setError(errMessages.serviceTypeNotAvailable)
  }
  const validTimes = settings.valid_times[serviceType]
  const firstMinute = settings.first_times[serviceType].minutes
  const interval = settings.first_times[serviceType].interval
  const holidays = settings.holidays[serviceType].map((i) => makeLocalDate(i))
  const weekdayTimes = makeWeekdaysExcluded(validTimes)
  const excludedTimes = settings.excluded_times[serviceType]
  const { excludeTimes, isClosed } = makeDatepickerArgs(
    requestedAtDate,
    weekdayTimes,
    excludedTimes,
    firstMinute,
    interval
  )

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
          <button className="btn btn--highlight" onClick={submitDate}>
            {updateText}
          </button>
        )}
        <button className="btn" onClick={cancel}>
          {cancelText}
        </button>
      </div>
    </div>
  )
}

RequestedAtPicker.displayName = 'RequestedAtPicker'
RequestedAtPicker.propTypes = {
  requestedAt: propTypes.string,
  setRequestedAt: propTypes.func,
  location: propTypes.object,
}

export default RequestedAtPicker
