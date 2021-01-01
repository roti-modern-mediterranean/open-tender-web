import React from 'react'
import propTypes from 'prop-types'
import ClipLoader from 'react-spinners/ClipLoader'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ModalLoading = ({ show }) => (
  <TransitionGroup component={null}>
    {show ? (
      <CSSTransition
        key="loader"
        classNames="md"
        timeout={{ enter: 250, exit: 250 }}
      >
        <div
          id="modal-container"
          className="modal-container"
          onClick={this.handleClose}
        >
          <ClipLoader size={44} color={'#ffffff'} />
        </div>
      </CSSTransition>
    ) : null}
  </TransitionGroup>
)

ModalLoading.displayName = 'ModalLoading'
ModalLoading.propTypes = {
  show: propTypes.bool,
}

export default ModalLoading
