import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@open-tender/components'

import { selectDisplaySettings, openModal } from '../../slices'
import iconMap from '../iconMap'

const ButtonAllergens = ({
  text = 'Allergens',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['Sliders'],
}) => {
  const dispatch = useDispatch()
  const { allergens: showAllergens } = useSelector(selectDisplaySettings)

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'allergens' }))
    evt.target.blur()
  }

  return showAllergens ? (
    <Button
      text={text}
      ariaLabel="Highlight allergens on the menu"
      icon={icon}
      classes={classes}
      onClick={onClick}
    />
  ) : null
}

ButtonAllergens.displayName = 'ButtonAllergens'
ButtonAllergens.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonAllergens
