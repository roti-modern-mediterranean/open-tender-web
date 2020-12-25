import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonMobileBack = ({ color, path = '/account' }) => {
  const history = useHistory()
  return (
    <ButtonIcon color={color} onClick={() => history.push(path)}>
      {iconMap['ArrowLeft']}
    </ButtonIcon>
  )
}

ButtonMobileBack.displayName = 'ButtonMobileBack'
ButtonMobileBack.propTypes = {
  color: propTypes.string,
  path: propTypes.string,
}

export default ButtonMobileBack
