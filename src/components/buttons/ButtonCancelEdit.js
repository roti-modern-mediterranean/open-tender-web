import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetOrder, resetCheckout } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonCancelEdit = ({
  orderId,
  text = 'Cancel Edit',
  classes = 'ot-btn--cancel ot-btn--header',
  icon = iconMap['XCircle'],
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleCancelEdit = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    dispatch(resetCheckout())
    history.push(`/account`)
    evt.target.blur()
  }

  return (
    <Button
      text={text}
      ariaLabel={`Cancel editing order ${orderId}`}
      icon={icon}
      classes={classes}
      onClick={handleCancelEdit}
    />
  )
}

ButtonCancelEdit.displayName = 'ButtonCancelEdit'
ButtonCancelEdit.propTypes = {
  orderId: propTypes.number,
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonCancelEdit
