import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectTimezone } from '@open-tender/redux'
import { makeRequestedAtStr } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'

const ButtonRequestedAt = ({
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['Clock'],
}) => {
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const requestedAtText = makeRequestedAtStr(requestedAt, tz)

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
    evt.target.blur()
  }

  return revenueCenter && requestedAt ? (
    <Button
      text={requestedAtText}
      ariaLabel={`Change time from ${requestedAtText}`}
      icon={icon}
      classes={classes}
      onClick={onClick}
    />
  ) : null
}

ButtonRequestedAt.displayName = 'ButtonRequestedAt'
ButtonRequestedAt.propTypes = {
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonRequestedAt
