import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectCustomer } from '@open-tender/redux'
import { ButtonIcon } from '@open-tender/components'

import { toggleNav } from '../../slices'
import iconMap from '../iconMap'

const NavMenu = ({ color }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <ButtonIcon
      label={auth ? 'Account Navigation' : 'Login'}
      color={color}
      onClick={() => dispatch(toggleNav())}
    >
      {!auth || isHome ? iconMap.User : iconMap.Menu}
    </ButtonIcon>
  )
}

NavMenu.displayName = 'NavMenu'
NavMenu.propTypes = {
  color: propTypes.string,
}

export default NavMenu
