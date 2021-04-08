import propTypes from 'prop-types'
import {
  isoToDateStr,
  currentLocalDateStr,
  todayDate,
  tomorrowDate,
} from '@open-tender/js'
import { FormHeader } from '../../inputs'

const makeOrderTimeStr = (requestedAt, tz) => {
  const orderDate =
    requestedAt === 'asap'
      ? currentLocalDateStr(tz, 'yyyy-MM-dd')
      : isoToDateStr(requestedAt, tz, 'yyyy-MM-dd')
  const isToday = todayDate() === orderDate
  const isTomorrow = tomorrowDate() === orderDate
  const requestedAtText =
    requestedAt === 'asap'
      ? `ASAP / ${currentLocalDateStr(tz, 'MMMM d')}`
      : isoToDateStr(requestedAt, tz, 'h:mma / MMMM d')
  const parenthetical = isToday ? ' (today)' : isTomorrow ? ' (tmrw)' : ''
  return `${requestedAtText}${parenthetical}`
}

const CheckoutOrderTime = ({ serviceType, requestedAt, tz, changeTime }) => {
  const requestedAtStr = makeOrderTimeStr(requestedAt, tz)
  return (
    <FormHeader style={{ margin: '3rem 0 0' }}>
      <h2>
        {serviceType.toLowerCase()} Time
        {changeTime ? (
          <button onClick={changeTime}>{requestedAtStr}</button>
        ) : (
          <span>{requestedAtStr}</span>
        )}
      </h2>
    </FormHeader>
  )
}

CheckoutOrderTime.displayName = 'CheckoutOrderTime'
CheckoutOrderTime.propTypes = {
  orderId: propTypes.number,
  order_fulfillment: propTypes.object,
}

export default CheckoutOrderTime
