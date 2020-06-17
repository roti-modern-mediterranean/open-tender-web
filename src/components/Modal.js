import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { selectModal, closeModal } from '../slices/modalSlice'
import ModalOverlay from './ModalOverlay'
import ModalLoading from './ModalLoading'
import {
  LoginModal,
  SignUpModal,
  AddressModal,
  AllergensModal,
  MenuItemModal,
  RequestedAtModal,
  CartErrorsModal,
  CreditCardModal,
  WorkingModal,
  ClosedModal,
  AdjustRequestedAtModal,
  OrderRatingModal,
} from './modals'

const makeModal = (type, args = {}) => {
  switch (type) {
    case 'login':
      return <LoginModal />
    case 'signUp':
      return <SignUpModal />
    case 'address':
      return <AddressModal />
    case 'creditCard':
      return <CreditCardModal />
    case 'allergens':
      return <AllergensModal />
    case 'item':
      return <MenuItemModal />
    case 'requestedAt':
      return <RequestedAtModal {...args} />
    case 'adjustRequestedAt':
      return <AdjustRequestedAtModal {...args} />
    case 'cartErrors':
      return <CartErrorsModal />
    case 'working':
      return <WorkingModal {...args} />
    case 'closed':
      return <ClosedModal {...args} />
    case 'rating':
      return <OrderRatingModal {...args} />
    default:
      return null
  }
}

const classesMap = {
  item: 'modal--item',
  address: 'modal--big',
  creditCard: 'modal--big',
  requestedAt: 'modal--big modal--datepicker',
  allergens: 'modal--big modal--allergens',
  cartErrors: 'modal--big modal--cart-errors',
  working: 'modal--working',
}

const Modal = () => {
  const windowRef = useRef()
  const dispatch = useDispatch()
  const { loading, type, args } = useSelector(selectModal)
  const preventClose = args && args.preventClose ? true : false
  const showModal = type ? true : false
  const modal = type ? makeModal(type, args) : null
  const classes = `modal-container ${classesMap[type] || ''}`

  const handleClose = (evt) => {
    if (!preventClose && evt.target.id === 'modal-container') {
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
