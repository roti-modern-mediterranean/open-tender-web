import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  selectMenuSlug,
  selectCartValidate,
  selectCheckout,
  validateOrder,
  resetSignUp,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled, useCheckout } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, selectOptIns } from '../../../slices'
import { AppContext } from '../../../App'
import {
  ButtonGroupBig,
  Content,
  HeaderCheckout,
  InlineLink,
  Main,
  PageContainer,
  SignUpForm,
} from '../..'
import { FormFooter, FormHeader, FormWrapper } from '../../inputs'
import { Back } from '../../buttons'
import styled from '@emotion/styled'

const CheckoutGuestView = styled(ButtonGroupBig)`
  margin: 0 0 4.5rem;
`

const CheckoutRegister = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const { signUp: signupConfig } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectSignUp)
  const optIns = useSelector(selectOptIns)
  const menuSlug = useSelector(selectMenuSlug)
  const { check, form, isGuest } = useSelector(selectCheckout)
  const cartValidate = useSelector(selectCartValidate)
  const validate = useCallback(
    (order) => dispatch(validateOrder(order)),
    [dispatch]
  )
  const cartWithCustomer = { ...cartValidate, customer: form.customer }
  useCheckout(validate, cartWithCustomer)
  const checkConfig = check ? check.config : {}
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    // dispatch(resetSignUp())
    return () => dispatch(resetSignUp())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (auth) {
      history.push('/checkout/details')
    } else if (isGuest) {
      history.push('/checkout/guest')
    }
  }, [auth, history, isGuest])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  const guestCheckout = () => {
    // dispatch(setGuest(true))
    history.push('/checkout/details')
  }

  const login = () => {
    history.push('/checkout/login')
  }

  return (
    <>
      <Helmet>
        <title>Checkout Register | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderCheckout
          left={<Back onClick={() => history.push(menuSlug)} />}
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
                <h1>{signupConfig.title}</h1>
                <p>{signupConfig.subtitle}</p>
                <p style={{ margin: '-1.5rem 0 3rem' }}>
                  Already have an account?{' '}
                  <InlineLink onClick={login}>Login here</InlineLink>
                </p>
              </FormHeader>
              <SignUpForm
                loading={loading}
                error={error}
                signUp={signUp}
                optIns={optIns}
                checkConfig={checkConfig}
              />
              <FormFooter>
                <p style={{ margin: '2rem 0' }}>
                  Already a member?{' '}
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

CheckoutRegister.displayName = 'CheckoutRegister'
export default CheckoutRegister
