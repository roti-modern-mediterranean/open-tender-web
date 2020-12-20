import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  fetchCustomer,
  resetCustomerThanx,
  selectCustomerThanx,
  logoutCustomer,
  addMessage,
} from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Content,
  HeaderLogo,
  HeaderMobile,
  Main,
  Welcome,
} from '../..'
import AccountActions from './AccountActions'
import AccountButtons from './AccountButtons'
import { ButtonAccount } from '../../buttons'
import { HeaderButtonMenu } from '../../buttonsHeader'

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { error: thanxError } = useSelector(selectCustomerThanx)
  const { background, title, subtitle } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const token = auth ? auth.access_token : null

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer({ token }))
  }, [token, dispatch, history])

  useEffect(() => {
    if (
      thanxError === 'This customer does not have a connected Thanx account'
    ) {
      dispatch(logoutCustomer())
      dispatch(resetCustomerThanx())
      dispatch(addMessage('Please login to reauthenticate your account'))
    }
  }, [thanxError, dispatch])

  return profile ? (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor={isBrowser ? null : 'transparent'}
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={
            isBrowser ? (
              <ButtonAccount classes="ot-btn--header" />
            ) : (
              <HeaderButtonMenu color="light" />
            )
          }
        />
        <Main padding="0" imageUrl={background}>
          <Welcome
            header={
              <>
                <h1>{pageTitle}</h1>
                <p>{subtitle}</p>
              </>
            }
            content={<AccountActions />}
          >
            <AccountButtons />
          </Welcome>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
