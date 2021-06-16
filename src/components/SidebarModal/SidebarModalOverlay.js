import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'

import { toggleSidebarModal } from '../../slices'
import styled from '@emotion/styled'

const SidebarModalOverlayView = styled('div')`
  position: fixed;
  z-index: 16;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const SidebarModalOverlay = ({ show = false }) => {
  const dispatch = useDispatch()
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition key="sidebar-overlay" classNames="overlay" timeout={500}>
          <SidebarModalOverlayView
            onClick={() => dispatch(toggleSidebarModal())}
          />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

SidebarModalOverlay.displayName = 'SidebarModalOverlay'
SidebarModalOverlay.propTypes = {
  show: propTypes.bool,
}

export default SidebarModalOverlay
