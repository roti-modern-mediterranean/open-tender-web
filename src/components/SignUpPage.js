import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignUpForm from './SignUpForm'
import { selectConfig } from '../slices/configSlice'
import SectionHeader from './SectionHeader'
import { selectToken } from '../slices/customerSlice'

const SignUpPage = () => {
  const history = useHistory()
  const { signUp: signUpConifg } = useSelector(selectConfig)
  const { title, subtitle, back } = signUpConifg
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) return history.push('/account')
  }, [token, history])

  return (
    <>
      <h1 className="sr-only">Sign Up</h1>
      <div className="signup content bg-secondary-color">
        <div className="section container ot-section">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle} />
            <div className="section__content bg-color border-radius">
              <div className="signup__form">
                <SignUpForm />
              </div>
            </div>
            <div className="section__footer">
              <p className="">
                <Link to="/" className="">
                  {back}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

SignUpPage.displayName = 'SignUpPage'
export default SignUpPage
