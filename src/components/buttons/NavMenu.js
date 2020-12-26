import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { ButtonIcon } from '@open-tender/components'

import { toggleNav } from '../../slices'
import iconMap from '../iconMap'

const NavMenu = ({ color }) => {
  const dispatch = useDispatch()
  return (
    <ButtonIcon color={color} onClick={() => dispatch(toggleNav())}>
      {iconMap.Menu}
    </ButtonIcon>
  )
}

NavMenu.displayName = 'NavMenu'
NavMenu.propTypes = {
  color: propTypes.string,
}

export default NavMenu
