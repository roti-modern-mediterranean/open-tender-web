import React, { useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  resetSignUp,
  selectMenuSlug,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, selectOptIns } from '../../../slices'
import { AppContext } from '../../../App'
import {
  ButtonGroupBig,
  Content,
  Header,
  Main,
  PageContainer,
  SignUpForm,
} from '../..'
import { FormFooter, FormHeader, FormWrapper } from '../../inputs'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'

const CheckoutGuestView = styled(ButtonGroupBig)`
  margin: 0 0 4.5rem;
`

const CheckoutRegister = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { signUp: signupConfig } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectSignUp)
  const optIns = useSelector(selectOptIns)
  const menuSlug = useSelector(selectMenuSlug)
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
      history.push('/checkout/details')
    }
  }, [auth, history])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <>
      <Helmet>
        <title>Checkout Register | {siteTitle}</title>
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
                <ButtonStyled
                  onClick={() => history.push('/checkout/guest')}
                  size="big"
                >
                  Checkout as a Guest
                </ButtonStyled>
              </CheckoutGuestView>
              <FormHeader>
                <h1>{signupConfig.title}</h1>
                <p>{signupConfig.subtitle}</p>
              </FormHeader>
              <SignUpForm
                loading={loading}
                error={error}
                signUp={signUp}
                // callback={() => history.push('/checkout/details')}
                optIns={optIns}
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
