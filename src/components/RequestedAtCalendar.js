import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { dateToIso } from '@open-tender/js'
import { ButtonStyled, useDatePicker } from '@open-tender/components'

import { closeModal } from '../slices'
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
}) => {
  const dispatch = useDispatch()
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
    // error,
  } = useDatePicker(revenueCenter, serviceType, requestedAt, setRequestedAt)

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
      <ButtonGroupBig>
        <ButtonStyled onClick={() => dispatch(closeModal())} size="big">
          Keep Current Time
        </ButtonStyled>
        {hasAsap && (
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
}

export default RequestedAtCalendar
