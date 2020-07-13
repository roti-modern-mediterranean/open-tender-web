import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonLocations = ({
  text = 'Locations',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['ArrowLeft'],
}) => {
  const history = useHistory()

  const onClick = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return <Button text={text} icon={icon} classes={classes} onClick={onClick} />
}

ButtonLocations.displayName = 'ButtonLocations'
ButtonLocations.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonLocations
