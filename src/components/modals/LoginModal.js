import React, { useState, useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectResetPassword,
  loginCustomer,
  loginCustomerThanx,
  sendPasswordResetEmail,
  resetPasswordReset,
  resetLoginError,
} from '@open-tender/redux'
import { LoginForm, SendResetForm, Button } from '@open-tender/components'

import { closeModal, selectBrand } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const messaging = {
  login: {
    title: 'Log into your account',
    subtitle: 'Please enter your email address and password',
    reset: 'Forget your password?',
  },
  thanx: {
    title: 'Log into your account',
    subtitle:
      "Please enter your email address, and we'll send you an email with a magic link that logs you into your account automatically.",
  },
  reset: {
    title: 'Reset your password',
    subtitle: 'Please enter the email address associated with your account',
    reset: 'Nevermind, I remembered it',
  },
  resetSent: {
    title: 'Password reset email sent',
    subtitle:
      'A reset password email was just sent to the email address you provided. Please check your inbox and click on the link in the email in order to reset your password.',
    reset: 'Back to login form',
  },
}

const LoginModal = ({ callback }) => {
  const [isReset, setIsReset] = useState(false)
  const dispatch = useDispatch()
  const { has_thanx } = useSelector(selectBrand)
  const customer = useSelector(selectCustomer)
  const { profile } = customer
  const resetPassword = useSelector(selectResetPassword)
  const { resetSent } = resetPassword
  const mode = has_thanx
    ? 'thanx'
    : resetSent
    ? 'resetSent'
    : isReset
    ? 'reset'
    : 'login'
  const msg = messaging[mode]
  const login = useCallback(
    (email, password) => dispatch(loginCustomer(email, password)),
    [dispatch]
  )
  const sendReset = useCallback(
    (email, linkUrl) => dispatch(sendPasswordResetEmail(email, linkUrl)),
    [dispatch]
  )
  const loginThanx = useCallback(
    (email) => dispatch(loginCustomerThanx(email)),
    [dispatch]
  )

  useEffect(() => {
    if (profile) dispatch(closeModal())
    return () => {
      dispatch(resetPasswordReset())
      dispatch(resetLoginError())
    }
  }, [profile, dispatch])

  const toggleReset = (evt) => {
    evt.preventDefault()
    setIsReset(!isReset)
    evt.target.blur()
  }

  const toggleResetSent = (evt) => {
    evt.preventDefault()
    setIsReset(false)
    dispatch(resetPasswordReset())
    evt.target.blur()
  }

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title={msg.title} />
          <p className="modal__subtitle">{msg.subtitle}</p>
        </div>
        <div className="modal__body">
          {resetSent ? (
            <Button
              classes="ot-btn"
              onClick={() => dispatch(closeModal())}
              text="Close"
            />
          ) : isReset ? (
            <SendResetForm
              {...resetPassword}
              sendReset={sendReset}
              callback={callback}
            />
          ) : (
            <LoginForm
              {...customer}
              login={has_thanx ? loginThanx : login}
              callback={callback}
              hasThanx={has_thanx}
            />
          )}
        </div>
        {!has_thanx && (
          <div className="modal__footer ot-font-size-small">
            <Button
              classes="ot-btn-link"
              onClick={resetSent ? toggleResetSent : toggleReset}
              text={msg.reset}
            />
          </div>
        )}
      </div>
    </>
  )
}

LoginModal.displayName = 'LoginModal'
LoginModal.propTypes = {
  callback: propTypes.func,
}

export default LoginModal
