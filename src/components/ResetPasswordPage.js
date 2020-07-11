import React, { useEffect, useCallback } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectResetPassword,
  resetPassword,
  resetPasswordReset,
} from '@open-tender/redux'
import { Button, ResetPasswordForm } from '@open-tender/components'

import { selectConfig, openModal } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import SectionFooter from './SectionFooter'

const ResetPasswordPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { hash } = useLocation()
  const resetToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const config = useSelector(selectConfig)
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
      {isBrowser && <Background imageUrl={config.resetPassword.background} />}
      {success ? (
        <div className="content">
          <PageTitle
            title="Success!"
            subtitle={
              <Button
                classes="ot-btn-link"
                onClick={handleLogin}
                text="Click here to log into your account"
              />
            }
          />
        </div>
      ) : (
        <div className="content">
          <PageTitle {...config.resetPassword} />
          <div className="section slide-up">
            <div className="container">
              <div className="section__container">
                <div className="section__content">
                  <div className="signup__form">
                    <ResetPasswordForm
                      loading={loading}
                      error={error}
                      reset={reset}
                      resetForm={resetForm}
                      resetToken={resetToken}
                    />
                  </div>
                </div>
                <SectionFooter>
                  <Link to="/" className="">
                    {config.resetPassword.back}
                  </Link>
                </SectionFooter>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

ResetPasswordPage.displayName = 'ResetPasswordPage'
export default ResetPasswordPage
