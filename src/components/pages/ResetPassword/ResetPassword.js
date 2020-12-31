import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectResetPassword,
  resetPassword,
  resetPasswordReset,
} from '@open-tender/redux'
import { ButtonLink, ResetPasswordForm } from '@open-tender/components'

import { selectBrand, selectConfig, openModal } from '../../../slices'
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

const ResetPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { hash } = useLocation()
  const resetToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { resetPassword: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { success, loading, error } = useSelector(selectResetPassword)
  const { windowRef } = useContext(AppContext)
  const reset = useCallback(
    (new_password, resetToken) =>
      dispatch(resetPassword(new_password, resetToken)),
    [dispatch]
  )
  const resetForm = useCallback(() => dispatch(resetPasswordReset), [dispatch])

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (auth) return history.push('/account')
    if (!resetToken) return history.push('/')
  }, [auth, resetToken, history])

  const handleLogin = () => {
    const args = {
      type: 'login',
      args: { callback: () => history.push('/account') },
    }
    dispatch(openModal(args))
  }

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : config.title} />
        <Main bgColor="secondary">
          <Container>
            {success ? (
              <>
                <PageTitle
                  title="Success!"
                  subtitle={
                    <ButtonLink onClick={handleLogin}>
                      Click here to log into your account
                    </ButtonLink>
                  }
                />
              </>
            ) : (
              <>
                <PageTitle {...config} />
                <PageContent>
                  <FormWrapper>
                    <ResetPasswordForm
                      loading={loading}
                      error={error}
                      reset={reset}
                      resetForm={resetForm}
                      resetToken={resetToken}
                    />
                  </FormWrapper>
                  <div style={{ margin: '3rem 0' }}>
                    <p>
                      <Link to="/" className="">
                        {config.back}
                      </Link>
                    </p>
                  </div>
                </PageContent>
              </>
            )}
          </Container>
        </Main>
      </Content>
    </>
  )
}

ResetPassword.displayName = 'ResetPassword'
export default ResetPassword
