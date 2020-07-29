import React from 'react'
import propTypes from 'prop-types'
import { timezoneMap, makeRequestedAtStr } from '@open-tender/js'

const OrderRequestedAt = ({ estimated_at, timezone, is_asap, status }) => {
  const tz = timezone && timezoneMap[timezone]
  const estimatedAt = estimated_at && makeRequestedAtStr(estimated_at, tz, true)
  return is_asap && status === 'OPEN' ? (
    <>
      <p className="ot-color-headings">ASAP</p>
      <p className="ot-font-size-small">
        {estimatedAt} (give or take a few minutes)
      </p>
    </>
  ) : (
    <p className="ot-color-headings">{estimatedAt}</p>
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
