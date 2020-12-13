import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'

const ButtonSettings = ({ text = '', icon = iconMap['Menu'] }) => {
  const dispatch = useDispatch()

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'allergens' }))
    evt.target.blur()
  }

  return <Button text={text} icon={icon} onClick={onClick} />
}

ButtonSettings.displayName = 'ButtonSettings'
ButtonSettings.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default ButtonSettings
