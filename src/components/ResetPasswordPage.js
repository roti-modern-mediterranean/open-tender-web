import React, { useEffect, useCallback } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectResetPassword,
  resetPassword,
  resetPasswordReset,
} from 'open-tender-redux'
import { Button, ResetPasswordForm } from 'open-tender'

import { selectConfig, openModal } from '../slices'
import SectionHeader from './SectionHeader'

const ResetPasswordPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { hash } = useLocation()
  const resetToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { resetPassword: resetPasswordConfig } = useSelector(selectConfig)
  const { title, subtitle, back } = resetPasswordConfig
  const { success, loading, error } = useSelector(selectResetPassword)
  const reset = useCallback(
    (new_password, resetToken) =>
      dispatch(resetPassword(new_password, resetToken)),
    [dispatch]
  )
  const resetForm = useCallback(() => dispatch(resetPasswordReset), [dispatch])

  useEffect(() => {
    if (auth) return history.push('/account')
    if (!resetToken) return history.push('/')
  }, [auth, resetToken, history])

  const handleLogin = (evt) => {
    evt.preventDefault()
    const args = {
      type: 'login',
      args: { callback: () => history.push('/account') },
    }
    dispatch(openModal(args))
    evt.target.blur()
  }

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="signup content ot-bg-color-secondary">
        <div className="section">
          <div className="container">
            <div className="section__container">
              <SectionHeader title={title} subtitle={subtitle} />
              <div className="section__content ot-bg-color-primary ot-border-radius">
                <div className="signup__form">
                  {success ? (
                    <div className="password-reset">
                      <p>Success! Your password has been reset.</p>
                      <p>
                        <Button
                          classes="ot-btn-link"
                          onClick={handleLogin}
                          text="Click here to log into your account"
                        />
                      </p>
                    </div>
                  ) : (
                    <ResetPasswordForm
                      loading={loading}
                      error={error}
                      reset={reset}
                      resetForm={resetForm}
                      resetToken={resetToken}
                    />
                  )}
                </div>
              </div>
              {!success && (
                <div className="section__footer">
                  <p className="">
                    <Link to="/" className="">
                      {back}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ResetPasswordPage.displayName = 'ResetPasswordPage'
export default ResetPasswordPage
