import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetOrderType, resetCheckout } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonStartOver = ({
  text = 'Start Over',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['ArrowLeft'],
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    history.push(`/`)
    evt.target.blur()
  }

  return <Button text={text} icon={icon} classes={classes} onClick={onClick} />
}

ButtonStartOver.displayName = 'ButtonStartOver'
ButtonStartOver.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonStartOver
