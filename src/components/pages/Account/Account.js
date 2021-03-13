import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  fetchCustomer,
  fetchCustomerCreditCards,
  resetCustomerThanx,
  fetchCustomerRewards,
  selectCustomerThanx,
  logoutCustomer,
  addMessage,
  selectAnnouncements,
  fetchAnnouncementPage,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  DealsSection,
  Greeting,
  HeaderLogo,
  HeaderMobile,
  Main,
  PageContainer,
  PageHero,
  PageView,
} from '../..'
import { Logout } from '../../buttons'
import AccountActions from './AccountActions'
import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountOrders from './AccountOrders'
import AccountLoyalty from './AccountLoyalty'
// import AccountFavorites from './AccountFavorites'
// import AccountGiftCards from './AccountGiftCards'
import AccountGroupOrders from './AccountGroupOrders'

const AccountLinks = () => (
  <p>
    <Link to="/gift-cards">Purchase gift cards</Link> |{' '}
    <Link to="/donations">make a donation</Link> |{' '}
    <Link to="/contact">get in touch</Link>
  </p>
)

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const announcements = useSelector(selectAnnouncements)
  const { title: siteTitle, has_thanx, has_deals } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { error: thanxError } = useSelector(selectCustomerThanx)
  const { background, mobile, title, subtitle, showHero } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const token = auth ? auth.access_token : null
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchAnnouncementPage('ACCOUNT'))
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
    dispatch(fetchCustomerRewards())
  }, [token, dispatch, history, has_thanx])

  // useEffect(() => {
  //   if (error) {
  //     console.log(error)
  //     dispatch(logoutCustomer())
  //     dispatch(addMessage(error))
  //     return history.push('/')
  //   }
  // }, [error, dispatch, history])

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
      <Content>
        <HeaderMobile
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
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageView>
            <PageHero
              announcements={announcements}
              imageUrl={isBrowser ? background : mobile}
              showHero={showHero}
            >
              <Greeting
                title={pageTitle}
                subtitle={subtitle}
                actions={<AccountActions />}
                // style={!isBrowser ? { margin: '0 0 6rem' } : null}
              >
                <AccountLinks />
              </Greeting>
            </PageHero>
            <PageContainer style={{ marginTop: '0' }}>
              <AccountGroupOrders />
              <AccountOrders />
              {has_deals && <DealsSection />}
              <AccountLoyalty />
              {/* <AccountFavorites />
              <AccountGiftCards /> */}
            </PageContainer>
          </PageView>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
