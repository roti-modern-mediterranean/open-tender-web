import React, { useEffect, useCallback, useContext } from 'react'
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

import { selectBrand, selectConfig, selectOptIns } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  FormWrapper,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
} from '../..'

const ThanxTerms = () => (
  <p>
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
)

const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { signUp: signupConfig } = useSelector(selectConfig)
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectSignUp)
  const optIns = useSelector(selectOptIns)
  const { windowRef } = useContext(AppContext)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    dispatch(resetSignUp())
    return () => dispatch(resetSignUp())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (auth) return history.push('/account')
  }, [auth, history])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <>
      <Helmet>
        <title>
          {signupConfig.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={signupConfig.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : signupConfig.title} />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...signupConfig} />
            <PageContent>
              {has_thanx && <ThanxTerms />}
              <FormWrapper>
                <SignUpForm
                  loading={loading}
                  error={error}
                  signUp={signUp}
                  optIns={optIns}
                  hasThanx={has_thanx}
                />
              </FormWrapper>
              <div style={{ margin: '3rem 0' }}>
                <p>
                  <Link to="/">{signupConfig.back}</Link>
                </p>
              </div>
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

SignUp.displayName = 'SignUp'
export default SignUp
