import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonSignUp = ({
  text = 'Sign Up',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['UserPlus'],
}) => {
  const history = useHistory()

  const onClick = (evt) => {
    evt.preventDefault()
    history.push(`/signup`)
    evt.target.blur()
  }

  return <Button text={text} icon={icon} classes={classes} onClick={onClick} />
}

ButtonSignUp.displayName = 'ButtonSignUp'
ButtonSignUp.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonSignUp
