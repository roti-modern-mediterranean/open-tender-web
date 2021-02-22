import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import NavButton from './NavButton'

const NavButtonsContainer = styled('div')`
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
    // background-color: rgba(0, 0, 0, 0.3);
    border-bottom: 0.1rem solid ${(props) => props.theme.border.color};
  }
`

const NavButtons = ({ buttons, delay = 0.125 }) => {
  return (
    <NavButtonsContainer>
      {buttons.map((button, index) => (
        <NavButton
          key={button.title}
          delay={`${((index + 1) * 0.125 + delay).toFixed(3)}s`}
          {...button}
        />
      ))}
    </NavButtonsContainer>
  )
}

NavButtons.displayName = 'NavButtons'
NavButton.propTypes = {
  buttons: propTypes.array,
}

export default NavButtons
