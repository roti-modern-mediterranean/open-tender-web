import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAlert, resetAlert } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { selectModal, closeModal, openModal, toggleSidebar } from '../slices'
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
  GiftCardModal,
  GiftCardAssignModal,
  GiftCardAssignOtherModal,
  WorkingModal,
  ClosedModal,
  AdjustRequestedAtModal,
  OrderRatingModal,
  OrderTypeModal,
  CartCountsModal,
  GroupOrderModal,
  LevelUpModal,
  QRCode,
} from './modals'
import styled from '@emotion/styled'

const makeModal = (type, windowRef, args = {}) => {
  switch (type) {
    case 'login':
      return <LoginModal {...args} />
    case 'signUp':
      return <SignUpModal windowRef={windowRef} {...args} />
    case 'address':
      return <AddressModal windowRef={windowRef} {...args} />
    case 'creditCard':
      return <CreditCardModal windowRef={windowRef} {...args} />
    case 'levelup':
      return <LevelUpModal windowRef={windowRef} {...args} />
    case 'giftCard':
      return <GiftCardModal windowRef={windowRef} {...args} />
    case 'giftCardAssign':
      return <GiftCardAssignModal windowRef={windowRef} {...args} />
    case 'giftCardAssignOther':
      return <GiftCardAssignOtherModal windowRef={windowRef} {...args} />
    case 'allergens':
      return <AllergensModal {...args} />
    case 'item':
      return <MenuItemModal {...args} />
    case 'requestedAt':
      return <RequestedAtModal {...args} />
    case 'adjustRequestedAt':
      return <AdjustRequestedAtModal {...args} />
    case 'cartErrors':
      return <CartErrorsModal {...args} />
    case 'cartCounts':
      return <CartCountsModal {...args} />
    case 'working':
      return <WorkingModal {...args} />
    case 'closed':
      return <ClosedModal {...args} />
    case 'orderType':
      return <OrderTypeModal {...args} />
    case 'rating':
      return <OrderRatingModal {...args} />
    case 'groupOrder':
      return <GroupOrderModal {...args} />
    case 'qrCode':
      return <QRCode {...args} />
    default:
      return null
  }
}

const classesMap = {
  signUp: 'modal--big',
  item: 'modal--item',
  address: 'modal--big',
  creditCard: 'modal--big',
  requestedAt: 'modal--big modal--datepicker',
  allergens: 'modal--big modal--allergens',
  cartErrors: 'modal--big modal--cart-errors',
  cartCounts: 'modal--big modal--cart-errors',
  working: 'modal--working',
  groupOrder: 'modal--big modal--guest',
}

// const ModalContainer = styled('div')`
//   position: fixed;
//   z-index: 101;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow-y: scroll;
// `

// const ModalView = styled('div')`
//   position: relative;
//   width: 48rem;
//   max-width: 90%;
//   overflow: hidden;
// `

const Modal = () => {
  const windowRef = useRef()
  const dispatch = useDispatch()
  const alert = useSelector(selectAlert)
  const { loading, type, args } = useSelector(selectModal)
  const preventClose = args && args.preventClose ? true : false
  const showModal = type ? true : false
  const modal = type ? makeModal(type, windowRef, args) : null
  console.log(modal)
  const classes = `modal-container ${classesMap[type] || ''}`

  useEffect(() => {
    if (alert) {
      if (alert.type === 'closeAndSidebar') {
        dispatch(closeModal())
        dispatch(toggleSidebar())
      } else if (alert.type === 'close') {
        dispatch(closeModal())
      } else {
        dispatch(openModal(alert))
      }
      dispatch(resetAlert())
    }
  }, [alert, dispatch])

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
              <div
                className="modal ot-bg-color-primary ot-border-radius"
                role="dialog"
                aria-labelledby="dialogTitle"
              >
                {modal}
              </div>
            </div>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

Modal.displayName = 'Modal'

export default Modal
