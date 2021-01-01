import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAlert, resetAlert } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

import { selectModal, closeModal, openModal, toggleSidebar } from '../../slices'
import ModalOverlay from './ModalOverlay'
import ModalLoading from './ModalLoading'
import {
  Login,
  GroupOrder,
  // SignUpModal,
  // AddressModal,
  // AllergensModal,
  // MenuItemModal,
  // RequestedAtModal,
  // CartErrorsModal,
  // CreditCardModal,
  // GiftCardModal,
  // GiftCardAssignModal,
  // GiftCardAssignOtherModal,
  // WorkingModal,
  // ClosedModal,
  // AdjustRequestedAtModal,
  // OrderRatingModal,
  // OrderTypeModal,
  // CartCountsModal,

  // LevelUpModal,
  // QRCode,
} from '../modals'

const makeModal = (type, windowRef, args = {}) => {
  switch (type) {
    case 'login':
      return <Login {...args} />
    // case 'signUp':
    //   return <SignUpModal windowRef={windowRef} {...args} />
    // case 'address':
    //   return <AddressModal windowRef={windowRef} {...args} />
    // case 'creditCard':
    //   return <CreditCardModal windowRef={windowRef} {...args} />
    // case 'levelup':
    //   return <LevelUpModal windowRef={windowRef} {...args} />
    // case 'giftCard':
    //   return <GiftCardModal windowRef={windowRef} {...args} />
    // case 'giftCardAssign':
    //   return <GiftCardAssignModal windowRef={windowRef} {...args} />
    // case 'giftCardAssignOther':
    //   return <GiftCardAssignOtherModal windowRef={windowRef} {...args} />
    // case 'allergens':
    //   return <AllergensModal {...args} />
    // case 'item':
    //   return <MenuItemModal {...args} />
    // case 'requestedAt':
    //   return <RequestedAtModal {...args} />
    // case 'adjustRequestedAt':
    //   return <AdjustRequestedAtModal {...args} />
    // case 'cartErrors':
    //   return <CartErrorsModal {...args} />
    // case 'cartCounts':
    //   return <CartCountsModal {...args} />
    // case 'working':
    //   return <WorkingModal {...args} />
    // case 'closed':
    //   return <ClosedModal {...args} />
    // case 'orderType':
    //   return <OrderTypeModal {...args} />
    // case 'rating':
    //   return <OrderRatingModal {...args} />
    case 'groupOrder':
      return <GroupOrder {...args} />
    // case 'qrCode':
    //   return <QRCode {...args} />
    default:
      return null
  }
}

const containerStyleMap = {
  address: { alignItems: 'flex-start' },
  creditCard: { alignItems: 'flex-start' },
  requestedAt: { alignItems: 'flex-start' },
  allergens: { alignItems: 'flex-start' },
  cartErrors: { alignItems: 'flex-start' },
  cartCounts: { alignItems: 'flex-start' },
  groupOrder: { alignItems: 'flex-start' },
}

const modalStyleMap = {
  cartErrors: { width: '90%', maxWidth: '60rem' },
  groupOrder: { margin: '2rem' },
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

const ModalContainer = styled('div')`
  position: fixed;
  z-index: 101;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`

const ModalView = styled('div')`
  position: relative;
  width: 48rem;
  max-width: 90%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
`

const Modal = () => {
  const modalRef = useRef()
  const dispatch = useDispatch()
  const alert = useSelector(selectAlert)
  const { loading, type, args } = useSelector(selectModal)
  const preventClose = args && args.preventClose ? true : false
  const showModal = type ? true : false
  const modal = type ? makeModal(type, modalRef, args) : null
  const containerStyle = containerStyleMap[type] || null
  const modalStyle = modalStyleMap[type] || null
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
            <ModalContainer
              ref={modalRef}
              id="modal-container"
              onClick={handleClose}
              style={containerStyle}
            >
              {modal}
              {/* <ModalView
                role="dialog"
                aria-labelledby="dialogTitle"
                style={modalStyle}
              >
                {modal}
              </ModalView> */}
            </ModalContainer>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

Modal.displayName = 'Modal'

export default Modal
