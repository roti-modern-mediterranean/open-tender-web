import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import iconMap from '../iconMap'

const NavButtonView = styled('button')`
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
  border-radius: ${(props) => props.theme.border.radiusSmall};
  transition: ${(props) => props.theme.links.transition};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 5.8rem;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 0;
    border: 0;
    border-radius: 0;
    border-top: 0.1rem solid ${(props) => props.theme.border.color};
    // border-top: 0.1rem solid ${(props) => props.theme.bgColors.secondary};
  }

  &:hover {
    background-color: ${(props) => props.theme.bgColors.secondary};
    border: 0.1rem solid ${(props) => props.theme.bgColors.secondary};

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      border: 0;
      border-top: 0.1rem solid ${(props) => props.theme.border.color};
      background-color: ${(props) => props.theme.bgColors.primary};
    }
  }

  &:last-of-type {
    margin-bottom: 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      border-bottom: 0;
    }
  }
`

const NavButtonIcon = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
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
  flex-shrink: 0;
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover & {
    transform: translateX(1rem);

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      transform: translateX(0);
    }
  }
`

const NavButton = ({ title, icon, onClick, delay = '0.125s' }) => {
  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    onClick()
  }

  return (
    <NavButtonView onClick={onUp} delay={delay}>
      <NavButtonIcon>{icon}</NavButtonIcon>
      <NavButtonTitle>{title}</NavButtonTitle>
      <NavButtonArrow>{iconMap.ChevronRight}</NavButtonArrow>
    </NavButtonView>
  )
}

NavButton.displayName = 'NavButton'
NavButton.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
  iconName: propTypes.string,
}
export default NavButton
