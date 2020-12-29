import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  // isoToDate,
  makeReadableDateStrFromIso,
  // minutesLeft,
} from '@open-tender/js'
import {
  selectGroupOrder,
  selectTimezone,
  selectCartTotal,
  selectMessages,
  addMessage,
  resetMessages,
} from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const GroupGuest = ({ icon = iconMap.ShoppingBag }) => {
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
  const text = cutoffTime ? `Submit by ${cutoffTime}` : 'Submit'
  // const cutoffDate = cutoffAt ? isoToDate(cutoffAt, tz) : null
  // const minutes = minutesLeft(cutoffDate, new Date())
  // const alertClass = minutes < 5 ? 'ot-btn--cancel' : 'ot-btn--highlight'

  const onClick = () => {
    if (cartTotal === 0) {
      const msg = `Your cart is currently empty. Please add some items to your order.`
      const current = messages.find((i) => i.message === msg)
      if (!current) dispatch(addMessage(msg))
    } else if (aboveLimit) {
      const msg = `Above spending limit of $${spendingLimit}`
      const current = messages.find((i) => i.message === msg)
      if (!current) dispatch(addMessage(msg))
    } else {
      dispatch(resetMessages())
      history.push('/review')
    }
  }

  if (!cartGuest) return null

  return <ButtonBoth text={text} icon={icon} onClick={onClick} color="cart" />
}

GroupGuest.displayName = 'GroupGuest'
export default GroupGuest
