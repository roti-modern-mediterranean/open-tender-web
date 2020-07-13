import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMenuSlug } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonMenu = ({
  text = 'Back To Menu',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['ArrowLeft'],
}) => {
  const history = useHistory()
  const menuSlug = useSelector(selectMenuSlug)
  const onClick = (evt) => {
    evt.preventDefault()
    history.push(menuSlug)
    evt.target.blur()
  }
  return <Button text={text} icon={icon} classes={classes} onClick={onClick} />
}

ButtonMenu.displayName = 'ButtonMenu'
ButtonMenu.propTypes = {
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonMenu
