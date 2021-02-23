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
  fetchCustomerRewards,
  selectCustomerRewards,
  selectCustomerThanx,
  logoutCustomer,
  addMessage,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Content,
  Deals,
  HeaderLogo,
  HeaderMobile,
  Hero,
  LoyaltyProgram,
  Main,
  PageHeader,
  PageHero,
  PageView,
  Slider,
} from '../..'
import { Logout } from '../../buttons'
import AccountActions from './AccountActions'
import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountProgress from './AccountProgress'
import AccountRewards from './AccountRewards'
import { makeSlides } from '../../HeroSlides'

const AccountContent = styled('div')`
  padding: ${(props) => (props.isMobile ? '0 0 6rem' : '0')};
`

const AccountHeader = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 2.5rem;
  }
`

const AccountLoyalty = styled('div')`
  margin: ${(props) => props.theme.layout.padding} 0;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} 0;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_thanx, has_deals = true } = useSelector(
    selectBrand
  )
  const { account: accountConfig } = useSelector(selectConfig)
  const { error: thanxError } = useSelector(selectCustomerThanx)
  const loyalty = useSelector(selectCustomerRewards)
  // console.log(loyalty)
  let { progress, rewards } = loyalty || {}
  rewards = []
  // const rewardsLoading = useSelector(selectCustomerRewardsLoading)
  // const hasRewards = rewards && !rewardsLoading
  const { background, mobile, title, subtitle } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const token = auth ? auth.access_token : null
  const { windowRef } = useContext(AppContext)
  const slides = makeSlides([])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
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
      {isBrowser && (
        <Background imageUrl={slides ? null : background}>
          {slides && <Slider slides={slides} />}
        </Background>
      )}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="primary"
          borderColor="primary"
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={
            isBrowser ? (
              <AccountTabs />
            ) : (
              <>
                <AccountScan />
                <Logout />
              </>
            )
          }
        />
        <Main bgColor="secondary">
          {!isBrowser && <AccountTabs />}
          <PageView>
            {!isBrowser && (
              <PageHero>
                {slides ? (
                  <Slider slides={slides} />
                ) : (
                  <Hero imageUrl={mobile}>&nbsp;</Hero>
                )}
              </PageHero>
            )}
            <AccountContent isMobile={!isBrowser}>
              <AccountHeader>
                <PageHeader title={pageTitle} subtitle={subtitle} />
                <AccountActions />
              </AccountHeader>
              {loyalty && (
                <AccountLoyalty>
                  {progress ? (
                    <AccountProgress loyalty={loyalty} />
                  ) : (
                    <LoyaltyProgram program={loyalty} />
                  )}
                </AccountLoyalty>
              )}
              {rewards && <AccountRewards rewards={rewards} />}
              {has_deals && <Deals />}
            </AccountContent>
          </PageView>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
