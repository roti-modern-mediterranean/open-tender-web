import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ModalOverlay = ({ show }) => (
  <TransitionGroup component={null}>
    {show ? (
      <CSSTransition
        key="overlay"
        classNames="md"
        timeout={{ enter: 250, exit: 250 }}
      >
        <div className="modal-overlay ot-opacity-dark" />
      </CSSTransition>
    ) : null}
  </TransitionGroup>
)

ModalOverlay.displayName = 'ModalOverlay'
ModalOverlay.propTypes = {
  show: propTypes.bool,
}

export default ModalOverlay
