import DatePicker from 'react-datepicker'

import { TimePicker } from '.'
import HighlightedMenu from './HighlightedMenu'


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
    <HighlightedMenu>
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
    </HighlightedMenu>
  )
}

export default RequestedAtPicker
