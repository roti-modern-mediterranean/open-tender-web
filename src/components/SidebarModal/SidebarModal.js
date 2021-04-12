import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { selectSidebarModal, toggleSidebarModal } from '../../slices'
import SidebarModalOverlay from './SidebarModalOverlay'
// import SidebarModalContent from './SidebarModalContent'

const SidebarModal = ({ children }) => {
  const dispatch = useDispatch()
  const sidebarRef = useRef(null)
  const [active, setActive] = useState(null)
  const [elements, setElements] = useState([])
  const { isOpen } = useSelector(selectSidebarModal)
  const canToggle = true

  const handleExit = () => {
    if (active) active.focus()
  }

  const handleFocus = () => {
    setActive(document.activeElement)
    const allElements = sidebarRef.current.querySelectorAll(
      'a[href], button, input, select, textarea'
    )
    setElements(allElements)
    const activeElements = Array.from(allElements).filter((i) => !i.disabled)
    const lastElement = activeElements
      ? activeElements[activeElements.length - 1]
      : null
    if (lastElement) lastElement.focus()
  }

  const handleKeys = useCallback(
    (evt) => {
      if (evt.keyCode === 9 && sidebarRef.current && elements.length) {
        const activeElements = Array.from(elements).filter((i) => !i.disabled)
        const firstElement = activeElements[0]
        const lastElement = activeElements[activeElements.length - 1]

        if (!evt.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          evt.preventDefault()
        }

        if (evt.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          evt.preventDefault()
        }
      } else if (evt.keyCode === 27 && canToggle) {
        dispatch(toggleSidebarModal())
      }
    },
    [elements, canToggle, dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeys, false)
    return () => document.removeEventListener('keydown', handleKeys, false)
  }, [handleKeys])

  return (
    <>
      <SidebarModalOverlay />
      <TransitionGroup component={null}>
        {isOpen ? (
          <CSSTransition
            key="sidebar"
            classNames="sidebar"
            timeout={{ enter: 500, exit: 500 }}
            onEntered={handleFocus}
            onExited={handleExit}
          >
            {/* <SidebarModalContent ref={sidebarRef} /> */}
            {React.cloneElement(children, { ref: sidebarRef })}
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

SidebarModal.displayName = 'SidebarModal'

export default SidebarModal
