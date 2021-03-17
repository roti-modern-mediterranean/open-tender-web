import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { ButtonIcon } from '@open-tender/components'

import { toggleNav } from '../../slices'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'

const NavMenuView = styled('span')`
  display: block;
  width: 5rem;
  height: 5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-left: -1.2rem;
  }

  button {
    span {
      position: relative;
      top: 0.1rem;
      line-height: 0;
      height: auto;
    }
  }

  svg {
    fill: ${(props) => props.color};
  }
`

const NavMenu = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const color = isBrowser ? '#E73C3E' : '#621C27'
  const size = isBrowser ? 30 : 25

  return (
    <NavMenuView color={color} size={size}>
      <ButtonIcon
        label={auth ? 'Account Navigation' : 'Login'}
        color={color}
        onClick={() => dispatch(toggleNav())}
        size={size}
      >
        <svg viewBox="0 0 25 21">
          <rect width="25" height="2" rx="1" />
          <rect y="19" width="25" height="2" rx="1" />
          <rect y="10" width="25" height="2" rx="1" />
        </svg>
      </ButtonIcon>
    </NavMenuView>
  )
}

NavMenu.displayName = 'NavMenu'
export default NavMenu
