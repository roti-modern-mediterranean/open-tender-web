import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'

const LoginModal = () => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Log into your account
          </p>
          <p className="modal__subtitle">
            Please enter the email address and password associated with your
            account below
          </p>
        </div>
        <div className="modal__body">
          <p>This is where the content will go</p>
        </div>
      </div>
    </>
  )
}

LoginModal.displayName = 'LoginModal'
LoginModal.propTypes = {
  close: propTypes.func,
}

export default LoginModal
