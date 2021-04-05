import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  loginCustomer,
  selectMenuSlug,
  resetPasswordReset,
  resetLoginError,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  ButtonGroupBig,
  Content,
  Header,
  LoginForm,
  Main,
  PageContainer,
} from '../..'
import { FormFooter, FormHeader, FormWrapper } from '../../inputs'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'
import {} from '../../forms'

const CheckoutGuestView = styled(ButtonGroupBig)`
  margin: 0 0 4.5rem;
`

const CheckoutLoginView = styled('div')`
  button {
    width: 100%;
  }
`

const CheckoutLogin = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth, loading, error } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const { windowRef } = useContext(AppContext)
  const login = useCallback(
    (email, password) => dispatch(loginCustomer(email, password)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    return () => {
      dispatch(resetPasswordReset())
      dispatch(resetLoginError())
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
                <h1>Login</h1>
                <p>Already a member? This will speed things up.</p>
              </FormHeader>
              <CheckoutLoginView>
                <LoginForm loading={loading} error={error} login={login} />
              </CheckoutLoginView>
              <FormFooter>
                <p style={{ margin: '2rem 0' }}>
                  Don't have an account yet?{' '}
                  <ButtonLink
                    onClick={() => history.push('/checkout/register')}
                  >
                    Register here
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

CheckoutLogin.displayName = 'CheckoutLogin'
export default CheckoutLogin
