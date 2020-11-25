import React, { useEffect, useCallback } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  resetSignUp,
} from '@open-tender/redux'
import { SignUpForm } from '@open-tender/components'

import { selectBrand, selectConfig, selectOptIns } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import SectionFooter from './SectionFooter'

const SignUpPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const { title, has_thanx } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectSignUp)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )
  const optIns = useSelector(selectOptIns)

  useEffect(() => {
    window.scroll(0, 0)
    return () => dispatch(resetSignUp())
  }, [dispatch])

  useEffect(() => {
    if (auth) return history.push('/account')
  }, [auth, history])

  useEffect(() => {
    if (error) window.scroll(0, 0)
  }, [error])

  return (
    <>
      <Helmet>
        <title>
          {config.signUp.title} | {title}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.signUp.background} />}
      <div className="content">
        <PageTitle {...config.signUp} />
        <div className="section slide-up">
          <div className="container">
            <div className="section__container">
              {has_thanx && (
                <p style={{ margin: '-1rem 0 3rem' }}>
                  By signing up you agree to our{' '}
                  <a
                    href="https://app.thanx.com/privacy"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    privacy policy
                  </a>{' '}
                  and our{' '}
                  <a
                    href="https://app.thanx.com/terms"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    terms of service
                  </a>
                  .
                </p>
              )}
              <div className="section__content">
                <div className="signup__form">
                  <SignUpForm
                    loading={loading}
                    error={error}
                    signUp={signUp}
                    optIns={optIns}
                    hasThanx={has_thanx}
                  />
                </div>
              </div>
              <SectionFooter>
                <Link to="/" className="">
                  {config.signUp.back}
                </Link>
              </SectionFooter>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

SignUpPage.displayName = 'SignUpPage'
export default SignUpPage
