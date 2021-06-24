import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAlert, resetAlert } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

import { selectModal, closeModal, openModal, toggleSidebar } from '../../slices'
import ModalOverlay from './ModalOverlay'
import ModalLoading from './ModalLoading'
import {
  Address,
  AdjustRequestedAt,
  Allergens,
  CartCounts,
  CartErrors,
  Closed,
  CreditCard,
  CreditCardLinked,
  Curbside,
  GiftCard,
  GiftCardAssign,
  GiftCardAssignOther,
  GroupOrder,
  GroupOrderInfo,
  Gratuity,
  LevelUp,
  Login,
  MenuItem,
  OrderRating,
  OrderType,
  QRCode,
  RequestedAt,
  Reward,
  SignUp,
  Working,
  GreenShug,
  OutOfStock,
} from '../modals'

const makeModal = (type, windowRef, args = {}) => {
  switch (type) {
    case 'address':
      return <Address windowRef={windowRef} {...args} />
    case 'adjustRequestedAt':
      return <AdjustRequestedAt {...args} />
    case 'allergens':
      return <Allergens {...args} />
    case 'cartCounts':
      return <CartCounts {...args} />
    case 'cartErrors':
      return <CartErrors {...args} />
    case 'closed':
      return <Closed {...args} />
    case 'creditCard':
      return <CreditCard windowRef={windowRef} {...args} />
    case 'creditCardLinked':
      return <CreditCardLinked {...args} />
    case 'giftCard':
      return <GiftCard windowRef={windowRef} {...args} />
    case 'giftCardAssign':
      return <GiftCardAssign windowRef={windowRef} {...args} />
    case 'giftCardAssignOther':
      return <GiftCardAssignOther windowRef={windowRef} {...args} />
    case 'gratuity':
      return <Gratuity {...args} />
    case 'greenShug':
      return <GreenShug {...args} />
    case 'groupOrder':
      return <GroupOrder {...args} />
    case 'groupOrderInfo':
      return <GroupOrderInfo {...args} />
    case 'outOfStock':
      return <OutOfStock {...args} />
    case 'item':
      return <MenuItem {...args} />
    case 'levelup':
      return <LevelUp windowRef={windowRef} {...args} />
    case 'login':
      return <Login {...args} />
    case 'orderType':
      return <OrderType {...args} />
    case 'qrCode':
      return <QRCode {...args} />
    case 'rating':
      return <OrderRating {...args} />
    case 'requestedAt':
      return <RequestedAt {...args} />
    case 'reward':
      return <Reward {...args} />
    case 'signUp':
      return <SignUp windowRef={windowRef} {...args} />
    case 'curbside':
      return <Curbside {...args} />
    case 'working':
      return <Working {...args} />
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
  signUp: { alignItems: 'flex-start' },
  gratuity: { alignItems: 'flex-start' },
  // greenShug: { alignItems: 'flex-start' },
}

const ModalContainer = styled('div')`
  position: fixed;
  z-index: 102;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`

const Modal = () => {
  const modalRef = useRef()
  const [active, setActive] = useState(null)
  const [elements, setElements] = useState([])
  const [, setInputs] = useState([])
  const dispatch = useDispatch()
  const alert = useSelector(selectAlert)
  const { loading, type, args } = useSelector(selectModal)
  const focusFirst = args && args.focusFirst ? true : false
  const preventClose = args && args.preventClose ? true : false
  const showModal = type ? true : false
  const modal = type ? makeModal(type, modalRef, args) : null
  const containerStyle = containerStyleMap[type] || null
  const isWorking = type === 'working'

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

  const handleExit = () => {
    if (active) active.focus()
  }

  const handleFocus = () => {
    setActive(document.activeElement)
    const allElements = modalRef.current.querySelectorAll(
      'a[href], button, input, select, textarea'
    )
    setElements(allElements)
    const allInputs = modalRef.current.querySelectorAll(
      'input, select, textarea'
    )
    setInputs(allInputs)
    const firstElement =
      !focusFirst && allInputs.length
        ? allInputs[0]
        : allElements
        ? allElements[0]
        : null
    if (firstElement) firstElement.focus()
  }

  const handleTabKey = useCallback(
    (evt) => {
      if (evt.keyCode === 9 && modalRef.current && elements.length) {
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
      } else if (evt.keyCode === 9 && isWorking) {
        evt.preventDefault()
      }
    },
    [elements, isWorking]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleTabKey, false)
    return () => document.removeEventListener('keydown', handleTabKey, false)
  }, [handleTabKey])

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
            onEntered={!isWorking ? handleFocus : null}
            onExited={!isWorking ? handleExit : null}
          >
            <ModalContainer
              ref={modalRef}
              id="modal-container"
              onClick={handleClose}
              style={containerStyle}
            >
              {modal}
            </ModalContainer>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

Modal.displayName = 'Modal'

export default Modal
