import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ChevronRight } from 'react-feather'

const NavButtonContainer = styled('button')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  padding: 2rem 2rem 2rem 2.5rem;
  margin: 0 0 1rem;
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-weight: ${(props) => props.theme.fonts.headings.weight};
  letter-spacing: ${(props) => props.theme.fonts.headings.letterSpacing};
  text-transform: ${(props) => props.theme.fonts.headings.textTransform};
  -webkit-font-smoothing: ${(props) =>
    props.theme.fonts.headings.fontSmoothing};
  color: ${(props) => props.theme.fonts.headings.color};
  font-size: ${(props) => props.theme.fonts.sizes.big};
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 0.1rem solid ${(props) => props.theme.border.color};
  transition: ${(props) => props.theme.links.transition};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;

  &:hover,
  &:active {
    background-color: ${(props) => props.theme.bgColors.secondary};
    border: 0.1rem solid ${(props) => props.theme.bgColors.secondary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0;
    border: 0;
    // border-bottom: 0.1rem solid ${(props) => props.theme.border.color};
    // border-top: 0.1rem solid ${(props) => props.theme.colors.light};
    border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
    // background-color: rgba(0, 0, 0, 0.3);
    background-color: transparent;
    color: ${(props) => props.theme.colors.light};
  }

  &:last-of-type {
    margin-bottom: 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      border-bottom: 0;
    }
  }
`

const NavButtonIcon = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.4rem;
  height: 1.4rem;
`

const NavButtonTitle = styled('span')`
  flex-grow: 1;
  padding: 0 2.5rem;
  line-height: 1.2;
  text-align: left;
`

const NavButtonArrow = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.8rem;
  height: 1.8rem;
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover &,
  button:active & {
    transform: translateX(1rem);
  }
`

const NavButton = ({ title, icon, onClick, delay = '0.125s' }) => (
  <NavButtonContainer onClick={onClick} delay={delay}>
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
