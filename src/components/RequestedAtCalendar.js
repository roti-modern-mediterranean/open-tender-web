import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  dateToIso,
  makeDatePickerDates,
  makeDatePickerTimes,
} from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import { ButtonGroupBig, RequestedAtPicker } from '.'

const RequestedAtCalendarView = styled('div')`
  max-width: 36rem;
  margin: 0 auto;

  & > div:first-of-type {
    margin: 0 0 2rem;
    border: 0.1rem solid ${(props) => props.theme.colors.line};
  }
`

const RequestedAtCalendar = ({
  requestedAt,
  serviceType,
  revenueCenter,
  setRequestedAt,
  keepCurrent,
}) => {
  const [date, setDate] = useState(null)
  const { settings, timezone: tz } = revenueCenter || {}
  const st = serviceType === 'WALKIN' ? 'PICKUP' : serviceType
  const firstTimes = settings.first_times[st]
  const hasAsap = firstTimes.has_asap
  const dateArgs = makeDatePickerDates(settings, serviceType)
  const { minDate, maxDate, excludeDates, filterDate } = dateArgs
  const timeArgs = makeDatePickerTimes(settings, serviceType, date)
  const { interval, excludeTimes } = timeArgs

  const selectTime = (time) => {
    setDate(null)
    setTimeout(() => {
      const reqestedAtIso = time ? dateToIso(time, tz) : 'asap'
      setRequestedAt(reqestedAtIso)
    }, 300)
  }

  return tz ? (
    <RequestedAtCalendarView>
      <RequestedAtPicker
        date={date}
        setDate={(date) => setDate(date)}
        selectTime={selectTime}
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        filterDate={filterDate}
        interval={interval}
        excludeTimes={excludeTimes}
      />
      <ButtonGroupBig>
        <ButtonStyled onClick={keepCurrent} size="big">
          Keep Current Time
        </ButtonStyled>
        {hasAsap && requestedAt !== 'asap' && (
          <ButtonStyled
            onClick={() => setRequestedAt('asap')}
            color="secondary"
            size="big"
          >
            Switch to ASAP
          </ButtonStyled>
        )}
      </ButtonGroupBig>
    </RequestedAtCalendarView>
  ) : null
}

RequestedAtCalendar.displayName = 'RequestedAtCalendar'
RequestedAtCalendar.propTypes = {
  requestedAt: propTypes.string,
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  setRequestedAt: propTypes.func,
  keepCurrent: propTypes.func,
}

export default RequestedAtCalendar
