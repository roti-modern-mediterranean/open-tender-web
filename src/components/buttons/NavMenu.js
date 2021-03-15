import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'
import { ButtonIcon } from '@open-tender/components'

import { toggleNav } from '../../slices'
import iconMap from '../iconMap'
import styled from '@emotion/styled'

const NavMenuView = styled('span')`
  display: flex;
  align-items: center;

  svg {
    fill: ${(props) => props.color};
  }
`

const NavMenu = ({ color, size }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)

  return (
    <ButtonIcon
      label={auth ? 'Account Navigation' : 'Login'}
      color={color}
      onClick={() => dispatch(toggleNav())}
      size={size}
    >
      {iconMap.Menu}
      {/* <NavMenuView color={color}>
        <svg viewBox="0 0 25 21">
          <rect width="25" height="2" rx="1" />
          <rect y="19" width="25" height="2" rx="1" />
          <rect y="10" width="25" height="2" rx="1" />
        </svg>
      </NavMenuView> */}
    </ButtonIcon>
  )
}

NavMenu.displayName = 'NavMenu'
NavMenu.propTypes = {
  color: propTypes.string,
  size: propTypes.number,
}
NavMenu.defaultProps = {
  color: '#E73C3E',
  size: 27,
}

export default NavMenu
