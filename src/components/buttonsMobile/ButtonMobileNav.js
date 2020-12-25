import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { ButtonIcon } from '@open-tender/components'

import { toggleNav } from '../../slices'
import iconMap from '../iconMap'

const ButtonMobileNav = ({ color }) => {
  const dispatch = useDispatch()
  return (
    <ButtonIcon color={color} onClick={() => dispatch(toggleNav())}>
      {iconMap['Menu']}
    </ButtonIcon>
  )
}

ButtonMobileNav.displayName = 'ButtonMobileMenu'
ButtonMobileNav.propTypes = {
  color: propTypes.string,
}

export default ButtonMobileNav
