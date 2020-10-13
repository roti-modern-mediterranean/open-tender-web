import React, { useEffect, useCallback } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  resetSignUp,
} from '@open-tender/redux'
import { SignUpForm } from '@open-tender/components'

import { selectBrand, selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import SectionFooter from './SectionFooter'

const SignUpPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectSignUp)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )
  const brand = useSelector(selectBrand)
  let initialState = {}
  if (brand && brand.accepts_marketing) initialState.accepts_marketing = true
  if (brand && brand.order_notifications)
    initialState.order_notifications = 'NONE'

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
      {isBrowser && <Background imageUrl={config.signUp.background} />}
      <div className="content">
        <PageTitle {...config.signUp} />
        <div className="section slide-up">
          <div className="container">
            <div className="section__container">
              <div className="section__content">
                <div className="signup__form">
                  <SignUpForm
                    loading={loading}
                    error={error}
                    signUp={signUp}
                    initialState={initialState}
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
