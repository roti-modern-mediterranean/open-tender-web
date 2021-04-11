import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'

import { TimePicker } from '.'

const RequestedAtPickerView = styled('div')`
  position: relative;
  width: 100%;
  height: 35rem;
  padding: 1rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.light};
`

const RequestedAtPicker = ({
  tz,
  date,
  setDate,
  minDate,
  maxDate = null,
  excludeDates,
  filterDate,
  minTime,
  maxTime,
  interval,
  excludeTimes,
  selectTime,
}) => {
  return (
    <RequestedAtPickerView>
      <DatePicker
        showPopperArrow={false}
        dateFormat="yyyy-MM-dd h:mm aa"
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        filterDate={filterDate}
        selected={date}
        onChange={(date) => setDate(date)}
        inline
        shouldCloseOnSelect={false}
      />
      <TimePicker
        date={date}
        setDate={setDate}
        selectTime={selectTime}
        interval={interval || 15}
        excludeTimes={excludeTimes}
        minTime={minTime}
        maxTime={maxTime}
      />
    </RequestedAtPickerView>
  )
}

export default RequestedAtPicker
