import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'

import { toggleSidebar } from '../../slices'
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

  return (
    <SidebarCloseView>
      {/* <ButtonLink
        onClick={() => dispatch(toggleSidebar())}
        label="Close cart & return to current page"
      >
        <X size={20} />
      </ButtonLink> */}
      <Back
        text="Close cart & return to current page"
        onClick={() => dispatch(toggleSidebar())}
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
