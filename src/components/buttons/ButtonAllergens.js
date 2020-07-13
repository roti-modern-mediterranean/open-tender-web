import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'

const ButtonAllergens = ({
  text = 'Allergens',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['Sliders'],
}) => {
  const dispatch = useDispatch()

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'allergens' }))
    evt.target.blur()
  }

  return (
    <Button
      text={text}
      ariaLabel="Highlight allergens on the menu"
      icon={icon}
      classes={classes}
      onClick={onClick}
    />
  )
}

ButtonAllergens.displayName = 'ButtonAllergens'
ButtonAllergens.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonAllergens
