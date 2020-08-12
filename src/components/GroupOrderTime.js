import React from 'react'
import { makeGroupOrderTimeStr } from '@open-tender/js'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectGroupOrder,
  selectTimezone,
  selectGroupOrderPrepTimes,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { openModal } from '../slices'

const GroupOrderTime = () => {
  const dispatch = useDispatch()
  const tz = useSelector(selectTimezone)
  const { requestedAt, cutoffAt } = useSelector(selectGroupOrder)
  const orderTime = makeGroupOrderTimeStr(requestedAt, tz)
  const cutoffTime = makeGroupOrderTimeStr(cutoffAt, tz)
  const { prepTime } = useSelector(selectGroupOrderPrepTimes)

  const adjustTime = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
    evt.target.blur()
  }

  return (
    <p>
      {orderTime === 'ASAP'
        ? `Please note that this order is currently scheduled for ASAP and will be ready about ${prepTime} minutes from the time it gets submitted.`
        : `Please note that this order must be submitted by ${cutoffTime} in order to
      be ready by the scheduled time of ${orderTime}.`}{' '}
      <Button
        text="Choose a different time."
        classes="ot-btn-link"
        onClick={adjustTime}
      />
    </p>
  )
}

GroupOrderTime.displayName = 'GroupOrderTime'
export default GroupOrderTime
