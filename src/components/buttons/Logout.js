import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../iconMap'
import { NavMenu } from '.'

const Logout = ({ text = 'Logout', icon = iconMap.UserX, color }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)

  return !isBrowser ? (
    <NavMenu color={color} />
  ) : auth ? (
    <ButtonStyled
      onClick={() => dispatch(logoutCustomer())}
      icon={icon}
      color="header"
      size="header"
    >
      {text}
    </ButtonStyled>
  ) : null
}

Logout.displayName = 'Logout'
Logout.propTypes = {
  classes: propTypes.string,
}

export default Logout
