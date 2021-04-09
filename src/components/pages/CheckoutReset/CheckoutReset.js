import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectMenuSlug,
  resetPasswordReset,
  selectResetPassword,
  sendPasswordResetEmail,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { ButtonGroupBig, Content, Header, Main, PageContainer } from '../..'
import { FormFooter, FormHeader, FormWrapper } from '../../inputs'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'
import { SendResetForm } from '../../forms'

const CheckoutGuestView = styled(ButtonGroupBig)`
  margin: 0 0 4.5rem;
`

const CheckoutResetView = styled('div')`
  div > button {
    width: 100%;
  }
`

const CheckoutReset = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const { loading, error, resetSent } = useSelector(selectResetPassword)
  const { windowRef } = useContext(AppContext)
  const sendReset = useCallback(
    (email, linkUrl) => dispatch(sendPasswordResetEmail(email, linkUrl)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    return () => {
      dispatch(resetPasswordReset())
    }
  }, [windowRef, dispatch])

  useEffect(() => {
    if (auth) {
      history.push('/checkout/details')
    }
  }, [auth, history])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  const guestCheckout = () => {
    history.push('/checkout/details')
  }

  return (
    <>
      <Helmet>
        <title>Checkout Login | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<Back onClick={() => history.push(menuSlug)} />}
          right={<Cart />}
        />
        <Main>
          <PageContainer style={{ marginTop: '0' }}>
            <FormWrapper>
              <CheckoutGuestView>
                <ButtonStyled onClick={guestCheckout} size="big">
                  Checkout as a Guest
                </ButtonStyled>
              </CheckoutGuestView>
              <FormHeader>
                {resetSent ? (
                  <>
                    <h1>Password reset link sent!</h1>
                    <p>Please check your email.</p>
                  </>
                ) : (
                  <>
                    <h1>Reset your password</h1>
                    <p>Please submit your email address below.</p>
                  </>
                )}
              </FormHeader>
              <CheckoutResetView>
                {!resetSent && (
                  <SendResetForm
                    loading={loading}
                    error={error}
                    sendReset={sendReset}
                  />
                )}
              </CheckoutResetView>
              <FormFooter>
                <p style={{ margin: '2rem 0' }}>
                  Remember your password?{' '}
                  <ButtonLink onClick={() => history.push('/checkout/login')}>
                    Log In
                  </ButtonLink>
                </p>
              </FormFooter>
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutReset.displayName = 'CheckoutReset'
export default CheckoutReset
