import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  fetchCustomer,
  fetchCustomerCreditCards,
  resetCustomerThanx,
  // fetchCustomerThanx,
  fetchCustomerRewards,
  selectCustomerRewards,
  // selectCustomerRewardsLoading,
  selectCustomerThanx,
  logoutCustomer,
  addMessage,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Content,
  HeaderLogo,
  HeaderMobile,
  Main,
  Welcome,
  WelcomeHeader,
} from '../..'
import { Logout } from '../../buttons'
import AccountActions from './AccountActions'
import AccountButtons from './AccountButtons'
import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountRewards from './AccountRewards'

const AccountContent = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2.5rem 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
  }
`

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { error: thanxError } = useSelector(selectCustomerThanx)
  const rewards = useSelector(selectCustomerRewards)
  // const rewardsLoading = useSelector(selectCustomerRewardsLoading)
  // const hasRewards = rewards && !rewardsLoading
  const { background, mobile, title, subtitle } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const token = auth ? auth.access_token : null
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
    // if (has_thanx) dispatch(fetchCustomerThanx())
    dispatch(fetchCustomerRewards())
  }, [token, dispatch, history, has_thanx])

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
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem" hasFooter={isBrowser ? true : false}>
        <HeaderMobile
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          maxWidth="76.8rem"
          // title={}
          // left={<StartOver isLogo={true} color="light" />}
          left={<HeaderLogo />}
          right={
            <>
              {!isBrowser && <AccountScan />}
              <Logout color="light" />
            </>
          }
        />
        <Main padding="0" imageUrl={mobile || background}>
          <Welcome footer={isBrowser ? <AccountButtons /> : <AccountTabs />}>
            <AccountContent>
              <div>
                <WelcomeHeader title={pageTitle} subtitle={subtitle} />
                <AccountActions />
              </div>
              {rewards && <AccountRewards rewards={rewards} />}
            </AccountContent>
          </Welcome>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
