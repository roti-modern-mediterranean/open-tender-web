import React from 'react'
import { useSelector } from 'react-redux'
import {
  isoToDate,
  makeReadableDateStrFromIso,
  minutesLeft,
} from '@open-tender/js'
import { selectGroupOrder, selectTimezone } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonGroupGuest = () => {
  // const dispatch = useDispatch()
  const tz = useSelector(selectTimezone)
  const { cartGuest, cutoffAt } = useSelector(selectGroupOrder)
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz) : null
  const cutoffDate = cutoffAt ? isoToDate(cutoffAt, tz) : null
  const minutes = minutesLeft(cutoffDate, new Date())
  const alertClass = minutes < 5 ? 'ot-btn--cancel' : 'ot-btn--highlight'
  const classes = `ot-btn--header ${alertClass}`
  const text = `Submit by ${cutoffTime}`

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  return cartGuest ? (
    <Button
      text={text}
      icon={iconMap['ShoppingBag']}
      classes={classes}
      onClick={onClick}
    />
  ) : null
}

ButtonGroupGuest.displayName = 'ButtonGroupGuest'
export default ButtonGroupGuest
