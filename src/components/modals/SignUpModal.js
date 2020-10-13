import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectSignUp, signUpCustomer, resetSignUp } from '@open-tender/redux'
import { SignUpForm } from '@open-tender/components'

import { closeModal, selectOptIns } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const SignUpModal = ({ windowRef }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectSignUp)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )
  const close = useCallback(() => dispatch(closeModal()), [dispatch])
  const optIns = useSelector(selectOptIns)

  useEffect(() => {
    return () => dispatch(resetSignUp())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      windowRef.current.scrollTop = 0
    }
  }, [error, windowRef])

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title="Sign up for an account" />
          <p className="modal__subtitle">
            Please provide the info below, and you'll be off to the races!
          </p>
        </div>
        <div className="modal__body">
          <SignUpForm
            loading={loading}
            error={error}
            signUp={signUp}
            callback={close}
            optIns={optIns}
          />
        </div>
      </div>
    </>
  )
}

SignUpModal.displayName = 'SignUpModal'
SignUpModal.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default SignUpModal
