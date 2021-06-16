import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'

import { TimePicker } from '.'

const RequestedAtPickerView = styled('div')`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 37rem;
  height: 35rem;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.light};
`


const RequestedAtPicker = ({
  date,
  setDate,
  selectTime,
  minDate,
  maxDate,
  excludeDates,
  filterDate,
  interval,
  excludeTimes,
  minTime = 0,
  maxTime = 1425,
}) => {
  return (
    <RequestedAtPickerView>
      <DatePicker
        inline
        showPopperArrow={false}
        shouldCloseOnSelect={false}
        dateFormat="yyyy-MM-dd h:mm aa"
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        filterDate={filterDate}
        selected={date}
        onChange={(date) => setDate(date)}
      />
      <TimePicker
        date={date}
        setDate={setDate}
        selectTime={selectTime}
        interval={interval}
        excludeTimes={excludeTimes}
        minTime={minTime}
        maxTime={maxTime}
      />
    </RequestedAtPickerView>
  )
}

export default RequestedAtPicker
