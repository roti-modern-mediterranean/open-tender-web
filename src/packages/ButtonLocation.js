import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const LocationButton = ({ location, onClick, classes = 'btn' }) => {
  return (
    <Button
      text={location.name}
      ariaLabel={`Change location from ${location.name}`}
      icon="MapPin"
      classes={classes}
      onClick={onClick}
    />
  )
}

LocationButton.displayName = 'LocationButton'
LocationButton.propTypes = {
  classes: propTypes.string,
}

export default LocationButton
