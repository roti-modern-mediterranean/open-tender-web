import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  resetSignUp,
} from 'open-tender-redux'

import { selectConfig } from '../slices'
import SignUpForm from './SignUpForm'
import SectionHeader from './SectionHeader'

const SignUpPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { signUp: signUpConifg } = useSelector(selectConfig)
  const { title, subtitle, back } = signUpConifg
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectSignUp)
  const signUp = (data, callback) => dispatch(signUpCustomer(data, callback))

  useEffect(() => {
    if (auth) return history.push('/account')
  }, [auth, history])

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="signup content bg-secondary-color">
        <div className="section container ot-section">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle} />
            <div className="section__content bg-color border-radius">
              <div className="signup__form">
                <SignUpForm
                  loading={loading}
                  error={error}
                  signUpCustomer={signUp}
                  resetSignUp={() => dispatch(resetSignUp())}
                />
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
