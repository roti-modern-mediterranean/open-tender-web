import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '@open-tender/components'

const ButtonBackToAccount = ({
  text = 'Back To Account',
  classes = 'ot-btn--secondary ot-btn--header',
}) => {
  const history = useHistory()

  const backToAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  return (
    <Button
      text={text}
      icon="ArrowLeft"
      classes={classes}
      onClick={backToAccount}
    />
  )
}

ButtonBackToAccount.displayName = 'ButtonBackToAccount'
ButtonBackToAccount.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonBackToAccount
