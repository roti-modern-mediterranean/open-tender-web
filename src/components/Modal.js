import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { selectModal, closeModal } from '../slices/modalSlice'
import ModalOverlay from './ModalOverlay'
import ModalLoading from './ModalLoading'
import {
  LoginModal,
  SignUpModal,
  AllergensModal,
  MenuItemModal,
  RequestedAtModal,
} from './modals'

const makeModal = (type, windowRef) => {
  switch (type) {
    case 'login':
      return <LoginModal />
    case 'signUp':
      return <SignUpModal />
    case 'allergens':
      return <AllergensModal />
    case 'item':
      return <MenuItemModal />
    case 'requestedAt':
      return <RequestedAtModal />
    default:
      return null
  }
}

const classesMap = {
  item: 'modal--item',
  allergens: '',
}

const Modal = () => {
  const windowRef = useRef()
  const dispatch = useDispatch()
  const { loading, type } = useSelector(selectModal)
  const showModal = type ? true : false
  const modal = type ? makeModal(type) : null
  const classes = `modal-container ${classesMap[type] || ''}`

  const handleClose = (evt) => {
    if (evt.target.id === 'modal-container') {
      dispatch(closeModal())
    }
  }

  return (
    <>
      <ModalOverlay show={showModal || loading} />
      <ModalLoading show={loading} />
      <TransitionGroup component={null}>
        {showModal ? (
          <CSSTransition
            key="modal"
            classNames="md"
            timeout={{ enter: 250, exit: 250 }}
          >
            <div
              ref={windowRef}
              id="modal-container"
              className={classes}
              onClick={handleClose}
            >
              <div className="modal bg-color border-radius">{modal}</div>
            </div>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

Modal.displayName = 'Modal'

export default Modal
