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
  linkPosToken,
} from '@open-tender/redux'
import { ButtonLink, FormWrapper } from '@open-tender/components'

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
  HeaderDefault,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
  SignUpForm,
} from '../..'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const posToken = useQuery().get('pos-token')
  const api = useSelector(selectAPI)
  const { signUp: signupConfig } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
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
        dispatch(linkPosToken(posToken)).finally(history.push('/'))
      } else {
        return history.push('/')
      }
    }
  }, [auth, history, posToken, token, api, dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <>
      <Helmet>
        <title>
          {signupConfig.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault title={isBrowser ? null : signupConfig.title} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...signupConfig} />
            <FormWrapper>
              <SignUpForm
                loading={loading}
                error={error}
                signUp={signUp}
                optIns={optIns}
              />
            </FormWrapper>
            <PageContent>
              <p style={{ margin: '2rem 0' }}>
                Already have an account?{' '}
                <ButtonLink onClick={login}>Click here to log in.</ButtonLink>
              </p>
              <p>
                <Link to="/">{signupConfig.back}</Link>
              </p>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

SignUp.displayName = 'SignUp'
export default SignUp
