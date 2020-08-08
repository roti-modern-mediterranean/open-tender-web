import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  resetOrderType,
  resetGroupOrder,
  resetCheckout,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonLeaveGroup = ({
  text = 'Leave Group Order',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['ArrowLeft'],
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onClick = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(resetGroupOrder())
    dispatch(resetCheckout())
    history.push(`/`)
    evt.target.blur()
  }

  return <Button text={text} icon={icon} classes={classes} onClick={onClick} />
}

ButtonLeaveGroup.displayName = 'ButtonLeaveGroup'
ButtonLeaveGroup.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonLeaveGroup
