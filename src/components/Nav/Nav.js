import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectNav } from '../../slices'
import NavOverlay from './NavOverlay'
import NavClose from './NavClose'

const NavContainer = styled('aside')`
  position: fixed;
  z-index: 17;
  top: 0;
  bottom: 0;
  right: 0;
  width: 44rem;
  max-width: 100%;
  transition: all 0.25s ease;
  background-color: ${(props) => props.theme.bgColors.primary};
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
`

const Nav = () => {
  const { isOpen } = useSelector(selectNav)

  return (
    <>
      <NavOverlay />
      <NavContainer isOpen={isOpen}>
        <div className="sidebar__container">
          {isOpen && <NavClose />}
          Nav will go here
        </div>
      </NavContainer>
    </>
  )
}

Nav.displayName = 'Nav'

export default Nav
