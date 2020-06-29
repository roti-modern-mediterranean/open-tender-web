import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import {
  loginCustomer,
  selectCustomer,
  sendPasswordResetEmail,
  resetResetSent,
} from '../../slices/customerSlice'
import ModalClose from '../ModalClose'
import { Input, Button } from 'open-tender'

const messaging = {
  login: {
    title: 'Log into your account',
    subtitle: 'Please enter your email address and password',
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
  const [data, setData] = useState({})
  const [isReset, setIsReset] = useState(false)
  const submitButton = useRef()
  const dispatch = useDispatch()
  const customer = useSelector(selectCustomer)
  const { loading, error, account, resetSent } = customer
  const mode = resetSent ? 'resetSent' : isReset ? 'reset' : 'login'
  const msg = messaging[mode]
  const isLoading = loading === 'pending'

  // useEffect(() => {
  //   return () => dispatch(resetResetSent)
  // }, [dispatch])

  useEffect(() => {
    if (account) dispatch(closeModal())
    return () => dispatch(resetResetSent())
  }, [account, dispatch])

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (isReset) {
      const link_url = `${window.location.origin}/reset-password`
      dispatch(sendPasswordResetEmail({ email: data.email, link_url }))
    } else {
      dispatch(loginCustomer(data)).then(() => {
        if (callback) callback()
      })
    }
    submitButton.current.blur()
  }

  const toggleReset = (evt) => {
    evt.preventDefault()
    setIsReset(!isReset)
    evt.target.blur()
  }

  const toggleResetSent = (evt) => {
    evt.preventDefault()
    setIsReset(false)
    dispatch(resetResetSent())
    evt.target.blur()
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">{msg.title}</p>
          <p className="modal__subtitle">{msg.subtitle}</p>
        </div>
        <div className="modal__body">
          {resetSent ? (
            <Button classes="btn" onClick={handleClose} text="Close" />
          ) : (
            <form
              id="login-form"
              className="form"
              onSubmit={handleSubmit}
              noValidate
            >
              {error && (
                <div className="form__error form__error--top form-error">
                  {error}
                </div>
              )}
              <div className="form__inputs">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  required={true}
                  classes="form__input"
                />
                {!isReset && (
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required={true}
                    classes="form__input"
                  />
                )}
              </div>
              <div className="form__submit">
                <input
                  className="btn"
                  type="submit"
                  value={isLoading ? 'Submitting' : 'Submit'}
                  disabled={isLoading}
                  ref={submitButton}
                />
              </div>
            </form>
          )}
        </div>
        <div className="modal__footer font-size-small">
          <Button
            classes="btn-link"
            onClick={resetSent ? toggleResetSent : toggleReset}
            text={msg.reset}
          />
        </div>
      </div>
    </>
  )
}

LoginModal.displayName = 'LoginModal'
LoginModal.propTypes = {
  callback: propTypes.func,
}

export default LoginModal
