import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { selectDisplaySettings, openModal } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Allergens = ({ text = 'Allergens', icon = iconMap.Sliders }) => {
  const dispatch = useDispatch()
  const { allergens: showAllergens } = useSelector(selectDisplaySettings)

  if (!showAllergens) return null

  return (
    <ButtonBoth
      text={text}
      label="Highlight allergens on the menu"
      icon={icon}
      onClick={() => dispatch(openModal({ type: 'allergens' }))}
    />
  )
}

Allergens.displayName = 'Allergens'
Allergens.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default Allergens
