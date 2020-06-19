import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'
import SignUpForm from '../SignUpForm'

const SignUpModal = () => {
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
            Sign up for an account
          </p>
          <p className="modal__subtitle">
            Please provide the info below, and you'll be off to the races!
          </p>
        </div>
        <div className="modal__body">
          <SignUpForm />
        </div>
      </div>
    </>
  )
}

SignUpModal.displayName = 'SignUpModal'
SignUpModal.propTypes = {
  close: propTypes.func,
}

export default SignUpModal
