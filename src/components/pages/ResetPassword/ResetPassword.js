import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectResetPassword,
  resetPassword,
  resetPasswordReset,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, openModal } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  Content,
  HeaderDefault,
  InlineLink,
  Main,
  PageContainer,
} from '../..'
import { FormWrapper } from '../../inputs'
import { ResetPasswordForm } from '../../forms'

const ResetPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { hash } = useLocation()
  const resetToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { resetPassword: config } = useSelector(selectConfig)
  const { title, subtitle } = config
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
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (auth) return history.push('/')
    if (!resetToken) return history.push('/')
  }, [auth, resetToken, history])

  const handleLogin = () => {
    const args = {
      type: 'login',
      args: { callback: () => history.push('/') },
    }
    dispatch(openModal(args))
  }

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {subtitle && <p>{subtitle}</p>}
              {success ? (
                <p>
                  Success!{' '}
                  <InlineLink onClick={handleLogin}>
                    Click here to log into your account
                  </InlineLink>
                </p>
              ) : (
                <>
                  <ResetPasswordForm
                    loading={loading}
                    error={error}
                    reset={reset}
                    resetForm={resetForm}
                    resetToken={resetToken}
                  />
                  <div style={{ margin: '3rem 0' }}>
                    <p>
                      <InlineLink onClick={() => history.push('/')}>
                        {config.back}
                      </InlineLink>
                    </p>
                  </div>
                </>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

ResetPassword.displayName = 'ResetPassword'
export default ResetPassword
