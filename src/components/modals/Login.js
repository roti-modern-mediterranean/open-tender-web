import React, { useState, useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
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
import {
  LoginForm,
  SendResetForm,
  ButtonLink,
  ButtonStyled,
} from '@open-tender/components'

import { closeModal, selectBrand } from '../../slices'
import { ModalContent, ModalView } from '..'

const messaging = {
  login: {
    title: 'Log into your account',
    subtitle: "Don't have an account?",
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

const LoginModal = ({ callback, posToken }) => {
  const [isReset, setIsReset] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
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
    (email, password, posToken) =>
      dispatch(loginCustomer(email, password, posToken)),
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

  const toggleReset = () => {
    setIsReset(!isReset)
  }

  const toggleResetSent = () => {
    setIsReset(false)
    dispatch(resetPasswordReset())
  }

  const signUp = () => {
    dispatch(closeModal())
    history.push(`/signup`)
  }

  return (
    <ModalView>
      <ModalContent
        title={msg.title}
        subtitle={
          <>
            <p>
              {msg.subtitle}{' '}
              {mode === 'login' && (
                <ButtonLink onClick={signUp}>Sign up here.</ButtonLink>
              )}
            </p>
            {mode === 'thanx' && (
              <p>
                Don't have an account yet?{' '}
                <ButtonLink onClick={signUp}>Sign up here.</ButtonLink>
              </p>
            )}
          </>
        }
        footer={
          !has_thanx && (
            <div>
              <ButtonLink onClick={resetSent ? toggleResetSent : toggleReset}>
                {msg.reset}
              </ButtonLink>
            </div>
          )
        }
      >
        {resetSent ? (
          <ButtonStyled onClick={() => dispatch(closeModal())}>
            Close
          </ButtonStyled>
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
            posToken={posToken}
          />
        )}
      </ModalContent>
    </ModalView>
  )
}

LoginModal.displayName = 'LoginModal'
LoginModal.propTypes = {
  callback: propTypes.func,
}

export default LoginModal
