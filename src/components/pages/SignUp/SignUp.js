import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  resetSignUp,
  addMessage,
  showNotification,
} from '@open-tender/redux'
import { ButtonLink, SignUpForm } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import {
  openModal,
  selectAPI,
  selectBrand,
  selectConfig,
  selectOptIns,
} from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  FormWrapper,
  Main,
  PageTitle,
  HeaderDefault,
  PageContainer,
} from '../..'

export const ThanxTerms = () => (
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

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const posToken = useQuery().get('pos-token')
  const api = useSelector(selectAPI)
  const { signUp: signupConfig } = useSelector(selectConfig)
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const { loading, error } = useSelector(selectSignUp)
  const optIns = useSelector(selectOptIns)
  const { windowRef } = useContext(AppContext)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(resetSignUp())
    return () => dispatch(resetSignUp())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (auth) {
      if (posToken) {
        api
          .postCustomerPosToken(token, posToken)
          .then(() => dispatch(showNotification('Order successfully linked!')))
          .catch((err) => {
            dispatch(addMessage(err.detail || err.message))
          })
          .finally(history.push('/'))
      } else {
        return history.push('/')
      }
    }
  }, [auth, history, posToken, token, api, dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  const login = () => {
    dispatch(openModal({ type: 'login', args: { posToken } }))
  }

  return (
    <>
      <Helmet>
        <title>
          {signupConfig.title} | {siteTitle}
        </title>
      </Helmet>
      {/* <Background imageUrl={signupConfig.background} /> */}
      <Content>
        <HeaderDefault title={isBrowser ? null : signupConfig.title} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...signupConfig} />
            {posToken && (
              <p style={{ margin: '0 0 4rem' }}>
                Already have an account?{' '}
                <ButtonLink onClick={login}>Click here to log in.</ButtonLink>
              </p>
            )}
            {has_thanx && <ThanxTerms />}
            <FormWrapper>
              <SignUpForm
                loading={loading}
                error={error}
                signUp={signUp}
                optIns={optIns}
                hasThanx={has_thanx}
                posToken={posToken}
              />
            </FormWrapper>
            <div style={{ margin: '3rem 0' }}>
              <p>
                <Link to="/">{signupConfig.back}</Link>
              </p>
            </div>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

SignUp.displayName = 'SignUp'
export default SignUp
