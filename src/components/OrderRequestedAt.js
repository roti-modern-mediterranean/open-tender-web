import React from 'react'
import propTypes from 'prop-types'
import { timezoneMap, makeRequestedAtStr } from 'open-tender-js'

const OrderRequestedAt = ({ requested_at, timezone, is_asap, status }) => {
  const tz = timezone && timezoneMap[timezone]
  const requestedAt = requested_at && makeRequestedAtStr(requested_at, tz, true)
  return is_asap && status === 'OPEN' ? (
    <>
      <p>ASAP</p>
      <p className="font-size-small secondary-color">
        {requestedAt} (give or take a few minutes)
      </p>
    </>
  ) : (
    <p>{requestedAt}</p>
  )
}

OrderRequestedAt.displayName = 'OrderRequestedAt'
OrderRequestedAt.propTypes = {
  requested_at: propTypes.string,
  timezone: propTypes.string,
  is_asap: propTypes.bool,
  status: propTypes.string,
}

export default OrderRequestedAt
