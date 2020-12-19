import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Menu } from 'react-feather'

import { toggleNav } from '../../slices'
import { HeaderButton } from '..'

const HeaderButtonMenu = ({ color }) => {
  const dispatch = useDispatch()
  return (
    <HeaderButton color={color} onClick={() => dispatch(toggleNav())}>
      <Menu size={20} />
    </HeaderButton>
  )
}

HeaderButton.propTypes = {
  color: propTypes.string,
}

export default HeaderButtonMenu
