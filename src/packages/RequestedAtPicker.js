import React, { useState } from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { dateToIso } from './utils/datetimes'

const RequestedAtPicker = ({ requestedAt, setRequestedAt, location }) => {
  const [date, setDate] = useState(requestedAt)
  const { timezone, settings } = location

  const submitDate = () => {
    const reqestedAtIso = dateToIso(date, timezone)
    setRequestedAt(reqestedAtIso)
  }

  return (
    <div className="datepicker-inline">
      <DatePicker
        showPopperArrow={false}
        showTimeSelect
        timeCaption="Time"
        timeFormat="h:mm aa"
        dateFormat="yyyy-MM-dd h:mm aa"
        // timeIntervals={interval}
        // excludeDates={holidays}
        // excludeTimes={excludeTimes}
        // filterDate={isClosed}
        selected={date}
        onChange={(date) => setDate(date)}
        inline
        shouldCloseOnSelect={false}
      />
      <div className="form__submit">
        <button className="btn" onClick={submitDate}>
          Submit Update
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
