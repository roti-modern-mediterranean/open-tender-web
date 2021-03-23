import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectTheme, toggleSidebar } from '../../slices'
import { Back } from '../buttons'

const SidebarCloseView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${(props) => props.theme.layout.padding};
  width: 5rem;
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: ${(props) => props.theme.layout.paddingMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const SidebarClose = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  return (
    <SidebarCloseView>
      <Back
        text="Close cart & return to current page"
        onClick={() => dispatch(toggleSidebar())}
        color={theme.colors.beet}
      />
    </SidebarCloseView>
  )
}

SidebarClose.displayName = 'SidebarClose'
SidebarClose.propTypes = {
  classes: propTypes.string,
  handleClose: propTypes.func,
}

export default SidebarClose
