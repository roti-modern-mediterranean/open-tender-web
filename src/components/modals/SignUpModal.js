import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSignUp, signUpCustomer, resetSignUp } from 'open-tender-redux'
import { SignUpForm } from 'open-tender'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'

const SignUpModal = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectSignUp)
  const signUp = (data, callback) => dispatch(signUpCustomer(data, callback))

  return (
    <>
      <ModalClose classes="btn-link" onClick={() => dispatch(closeModal())} />
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
          <SignUpForm
            loading={loading}
            error={error}
            signUpCustomer={signUp}
            resetSignUp={() => dispatch(resetSignUp())}
            calllback={() => dispatch(closeModal())}
          />
        </div>
      </div>
    </>
  )
}

SignUpModal.displayName = 'SignUpModal'

export default SignUpModal
