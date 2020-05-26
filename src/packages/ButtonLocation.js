import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonLocation = ({ location, onClick, classes = 'btn' }) => {
  return location ? (
    <Button
      text={location.name}
      ariaLabel={`Change location from ${location.name}`}
      icon="MapPin"
      classes={classes}
      onClick={onClick}
    />
  ) : null
}

ButtonLocation.displayName = 'ButtonLocation'
ButtonLocation.propTypes = {
  location: propTypes.object,
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonLocation
