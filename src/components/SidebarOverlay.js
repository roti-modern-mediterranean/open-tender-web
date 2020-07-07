import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

import { selectSidebar, toggleSidebar } from '../slices'

const SidebarOverlay = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectSidebar)
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition key="sidebar-overlay" classNames="md" timeout={250}>
          <div
            className="sidebar-overlay ot-opacity-dark"
            onClick={() => dispatch(toggleSidebar())}
          />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

SidebarOverlay.displayName = 'SidebarOverlay'

export default SidebarOverlay
