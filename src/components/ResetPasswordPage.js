import React, { useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCustomer, selectResetPassword } from 'open-tender-redux'

import { selectConfig } from '../slices'
import SectionHeader from './SectionHeader'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordPage = () => {
  const history = useHistory()
  const { hash } = useLocation()
  const resetToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { resetPassword: resetPasswordConfig } = useSelector(selectConfig)
  const { title, subtitle, back } = resetPasswordConfig
  const { success } = useSelector(selectResetPassword)

  useEffect(() => {
    if (auth) return history.push('/account')
    if (!resetToken) return history.push('/')
  }, [auth, resetToken, history])

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="signup content bg-secondary-color">
        <div className="section container ot-section">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle} />
            <div className="section__content bg-color border-radius">
              <div className="signup__form">
                <ResetPasswordForm resetToken={resetToken} />
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
    </>
  )
}

ResetPasswordPage.displayName = 'ResetPasswordPage'
export default ResetPasswordPage
