import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMenuSlug } from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Menu = ({ text = 'Back To Menu', icon = iconMap.ArrowLeft }) => {
  const history = useHistory()
  const menuSlug = useSelector(selectMenuSlug)

  return (
    <ButtonBoth
      text={text}
      icon={icon}
      onClick={() => history.push(menuSlug)}
    />
  )
}

Menu.displayName = 'Menu'
Menu.propTypes = {
  onClick: propTypes.func,
  icon: propTypes.element,
}

export default Menu
