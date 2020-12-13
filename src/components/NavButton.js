import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ChevronRight } from 'react-feather'

const NavButtonContainer = styled('button')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 2rem 2.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.main};
  border-bottom: 0.1rem solid ${(props) => props.theme.border.color};
`

const NavButtonIcon = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.5rem;
  height: 1.5rem;
`

const NavButtonTitle = styled('span')`
  flex-grow: 1;
  padding: 0 2.5rem;
  line-height: 1;
  text-align: left;
`

const NavButtonArrow = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.8rem;
  height: 1.8rem;
`

const NavButton = ({ title, onClick, icon }) => (
  <NavButtonContainer onClick={onClick}>
    <NavButtonIcon>{icon}</NavButtonIcon>
    <NavButtonTitle>{title}</NavButtonTitle>
    <NavButtonArrow>
      <ChevronRight size={null} />
    </NavButtonArrow>
  </NavButtonContainer>
)

NavButton.displayName = 'NavButton'
NavButton.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
  iconName: propTypes.string,
}
export default NavButton
