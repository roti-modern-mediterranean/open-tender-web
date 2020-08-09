import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  isoToDate,
  makeReadableDateStrFromIso,
  minutesLeft,
} from '@open-tender/js'
import {
  selectGroupOrder,
  selectTimezone,
  selectCartTotal,
  selectMessages,
  addMessage,
  resetMessages,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonGroupGuest = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const tz = useSelector(selectTimezone)
  const { cartGuest, cutoffAt, spendingLimit } = useSelector(selectGroupOrder)
  const limit = spendingLimit ? parseFloat(spendingLimit) : null
  const cartTotal = useSelector(selectCartTotal)
  const messages = useSelector(selectMessages)
  const aboveLimit = limit && cartTotal > limit
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz) : null
  const cutoffDate = cutoffAt ? isoToDate(cutoffAt, tz) : null
  const minutes = minutesLeft(cutoffDate, new Date())
  const alertClass = minutes < 5 ? 'ot-btn--cancel' : 'ot-btn--highlight'
  const classes = `ot-btn--header ${alertClass}`
  const text = `Submit by ${cutoffTime}`

  const onClick = (evt) => {
    evt.preventDefault()
    if (aboveLimit) {
      const msg = `Above spending limit of $${spendingLimit}`
      const current = messages.find((i) => i.message === msg)
      if (!current) dispatch(addMessage(msg))
    } else {
      dispatch(resetMessages())
      history.push('/review')
    }
    evt.target.blur()
  }

  return cartGuest ? (
    <Button
      text={text}
      icon={iconMap['ShoppingBag']}
      classes={classes}
      onClick={onClick}
      // disabled={aboveLimit}
    />
  ) : null
}

ButtonGroupGuest.displayName = 'ButtonGroupGuest'
export default ButtonGroupGuest
