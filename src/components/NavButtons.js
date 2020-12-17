import React from 'react'
import propTypes from 'prop-types'
import { NavButton } from '.'
import styled from '@emotion/styled'

const NavButtonsContainer = styled('div')`
  padding: 2.5rem;
`

const NavButtons = ({ buttons }) => {
  return (
    <NavButtonsContainer>
      {buttons.map((button) => (
        <NavButton key={button.title} {...button} />
      ))}
    </NavButtonsContainer>
  )
}

NavButtons.displayName = 'NavButtons'
NavButton.propTypes = {
  buttons: propTypes.array,
}

export default NavButtons
