import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { toggleNav } from '../../slices'
import { HeaderButton } from '..'
import iconMap from '../iconMap'

const HeaderButtonMenu = ({ color }) => {
  const dispatch = useDispatch()
  return (
    <HeaderButton color={color} onClick={() => dispatch(toggleNav())}>
      {iconMap['Menu']}
    </HeaderButton>
  )
}

HeaderButtonMenu.displayName = 'HeaderButtonMenu'
HeaderButtonMenu.propTypes = {
  color: propTypes.string,
}

export default HeaderButtonMenu
