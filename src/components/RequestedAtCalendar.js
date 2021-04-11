import React, { useState } from 'react'
import propTypes from 'prop-types'
import { dateToIso } from '@open-tender/js'
import { useDatePicker } from '@open-tender/components'

import { RequestedAtPicker } from '.'

const RequestedAtCalendar = ({
  requestedAt,
  serviceType,
  revenueCenter,
  setRequestedAt,
}) => {
  const [date, setDate] = useState(null)
  const {
    tz,
    minDate,
    maxDate,
    excludeDates,
    filterDate,
    interval,
    excludeTimes,
    hasAsap,
    // date,
    // setDate,
    error,
  } = useDatePicker(revenueCenter, serviceType, requestedAt, setRequestedAt)

  const selectTime = (time) => {
    setDate(null)
    setTimeout(() => {
      const reqestedAtIso = time ? dateToIso(time, tz) : 'asap'
      setRequestedAt(reqestedAtIso)
    }, 300)
  }

  return tz ? (
    <RequestedAtPicker
      tz={tz}
      date={date}
      setDate={(date) => setDate(date)}
      minDate={minDate}
      maxDate={maxDate}
      excludeDates={excludeDates}
      filterDate={filterDate}
      minTime={0}
      maxTime={1425}
      interval={interval}
      excludeTimes={excludeTimes}
      selectTime={selectTime}
    />
  ) : null
}

RequestedAtCalendar.displayName = 'RequestedAtCalendar'
RequestedAtCalendar.propTypes = {
  requestedAt: propTypes.string,
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  setRequestedAt: propTypes.func,
}

export default RequestedAtCalendar
