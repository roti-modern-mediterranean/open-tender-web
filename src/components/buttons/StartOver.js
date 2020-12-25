import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { resetOrderType, resetCheckout } from '@open-tender/redux'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const StartOver = ({ text = 'Start Over', icon = iconMap['ArrowLeft'] }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const startOver = () => {
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    history.push(`/`)
  }

  return isBrowser ? (
    <ButtonStyled onClick={startOver} icon={icon} color="header" size="header">
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon onClick={startOver}>{iconMap['ArrowLeft']}</ButtonIcon>
  )
}

StartOver.displayName = 'StartOver'
StartOver.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default StartOver
