import React, { useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import SectionHeader from './SectionHeader'
import ResetPasswordForm from './ResetPasswordForm'
import { selectCustomer, selectResetPassword } from '../slices/customerSlice'

const ResetPasswordPage = () => {
  const history = useHistory()
  const { hash } = useLocation()
  const token = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { resetPassword: resetPasswordConfig } = useSelector(selectConfig)
  const { title, subtitle, back } = resetPasswordConfig
  const { success } = useSelector(selectResetPassword)

  useEffect(() => {
    if (auth) return history.push('/account')
    if (!token) return history.push('/')
  }, [auth, token, history])

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="signup content bg-secondary-color">
        <div className="section container ot-section">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle} />
            <div className="section__content bg-color border-radius">
              <div className="signup__form">
                <ResetPasswordForm token={token} />
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
