import React from 'react'
import propTypes from 'prop-types'
import { timezoneMap, makeRequestedAtStr } from '@open-tender/js'

const OrderRequestedAt = ({ estimated_at, timezone, is_asap, status }) => {
  const tz = timezone && timezoneMap[timezone]
  const estimatedAt = estimated_at && makeRequestedAtStr(estimated_at, tz, true)
  return is_asap && status === 'OPEN' ? (
    <>
      <p>ASAP</p>
      <p className="ot-font-size-small ot-color-secondary">
        {estimatedAt} (give or take a few minutes)
      </p>
    </>
  ) : (
    <p>{estimatedAt}</p>
  )
}

OrderRequestedAt.displayName = 'OrderRequestedAt'
OrderRequestedAt.propTypes = {
  estimated_at: propTypes.string,
  timezone: propTypes.string,
  is_asap: propTypes.bool,
  status: propTypes.string,
}

export default OrderRequestedAt
