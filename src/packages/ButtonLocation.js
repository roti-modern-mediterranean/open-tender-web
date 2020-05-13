import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLocation } from '../slices/orderSlice'
import Button from './Button'

const LocationButton = ({ classes = 'btn' }) => {
  const location = useSelector(selectLocation)
  const history = useHistory()

  const handleClick = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return (
    <Button
      text={location.name}
      ariaLabel={`Change location from ${location.name}`}
      icon="MapPin"
      classes={classes}
      onClick={handleClick}
    />
  )
}

LocationButton.displayName = 'LocationButton'
LocationButton.propTypes = {
  classes: propTypes.string,
}

export default LocationButton
