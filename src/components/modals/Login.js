import React, { useState, useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectResetPassword,
  loginCustomer,
  sendPasswordResetEmail,
  resetPasswordReset,
  resetLoginError,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { InlineLink, ModalContent, ModalView } from '..'
import { LoginForm, SendResetForm } from '../forms'

const messaging = {
  login: {
    title: 'Log into your account',
    subtitle: "Don't have an account?",
    reset: 'Forget your password?',
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
  const history = useHistory()
  const customer = useSelector(selectCustomer)
  const { profile } = customer
  const resetPassword = useSelector(selectResetPassword)
  const { resetSent } = resetPassword
  const mode = resetSent ? 'resetSent' : isReset ? 'reset' : 'login'
  const msg = messaging[mode]
  const login = useCallback(
    (email, password) => dispatch(loginCustomer(email, password)),
    [dispatch]
  )
  const sendReset = useCallback(
    (email, linkUrl) => dispatch(sendPasswordResetEmail(email, linkUrl)),
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
          <p>
            {msg.subtitle}{' '}
            {mode === 'login' && (
              <InlineLink onClick={signUp}>Sign up here.</InlineLink>
            )}
          </p>
        }
        footer={
          <p>
            <InlineLink onClick={resetSent ? toggleResetSent : toggleReset}>
              {msg.reset}
            </InlineLink>
          </p>
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
          <LoginForm {...customer} login={login} callback={callback} />
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
