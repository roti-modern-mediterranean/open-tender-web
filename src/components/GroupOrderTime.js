import React from 'react'
import { makeGroupOrderTimeStr } from '@open-tender/js'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectGroupOrder,
  selectTimezone,
  selectGroupOrderPrepTimes,
} from '@open-tender/redux'

import { openModal } from '../slices'
import InlineLink from './InlineLink'

const GroupOrderTime = () => {
  const dispatch = useDispatch()
  const tz = useSelector(selectTimezone)
  const { requestedAt, cutoffAt } = useSelector(selectGroupOrder)
  const orderTime = makeGroupOrderTimeStr(requestedAt, tz)
  const cutoffTime = makeGroupOrderTimeStr(cutoffAt, tz)
  const { prepTime } = useSelector(selectGroupOrderPrepTimes)

  const adjustTime = () => {
    dispatch(openModal({ type: 'requestedAt' }))
  }

  return (
    <p>
      {orderTime === 'ASAP'
        ? `Please note that this group order is currently scheduled for ASAP and will be ready about ${prepTime} minutes from the time it gets submitted.`
        : `Please note that this order must be submitted by ${cutoffTime} in order to
      be ready by the scheduled time of ${orderTime}.`}{' '}
      <InlineLink onClick={adjustTime}>Choose a different time.</InlineLink>
    </p>
  )
}

GroupOrderTime.displayName = 'GroupOrderTime'
export default GroupOrderTime
