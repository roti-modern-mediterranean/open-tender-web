import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'
import { makeRequestedAtString } from './utils/datetimes'

const ButtonRequestedAt = ({ requestedAt, tz, action, classes = 'btn' }) => {
  const handleChange = (evt) => {
    evt.preventDefault()
    action()
    evt.target.blur()
  }

  const requestedAtText = makeRequestedAtString(requestedAt, tz)

  return (
    <Button
      text={requestedAtText}
      ariaLabel={`Change time from ${requestedAtText}`}
      icon="Clock"
      classes={classes}
      onClick={handleChange}
    />
  )
}

ButtonRequestedAt.displayName = 'ButtonRequestedAt'
ButtonRequestedAt.propTypes = {
  requestedAt: propTypes.string,
  tz: propTypes.string,
  action: propTypes.func,
  classes: propTypes.string,
}

export default ButtonRequestedAt
