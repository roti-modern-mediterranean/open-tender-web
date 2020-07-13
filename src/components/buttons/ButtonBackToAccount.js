import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonBackToAccount = ({
  text = 'Back To Account',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['ArrowLeft'],
}) => {
  const history = useHistory()

  const backToAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  return (
    <Button text={text} icon={icon} classes={classes} onClick={backToAccount} />
  )
}

ButtonBackToAccount.displayName = 'ButtonBackToAccount'
ButtonBackToAccount.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonBackToAccount
