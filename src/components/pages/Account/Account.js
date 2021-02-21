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
  Container,
  Content,
  HeaderLogo,
  HeaderMobile,
  Hero,
  HeroContent,
  Main,
  Slider,
  Welcome,
  WelcomeHeader,
} from '../..'
import { Logout } from '../../buttons'
import AccountActions from './AccountActions'
import AccountButtons from './AccountButtons'
import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountProgress from './AccountProgress'
import AccountRewards from './AccountRewards'

const AccountContent = styled('div')`
  margin: 2rem 0;
`

const AccountHeader = styled('div')`
  flex: 1 0 auto;
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  //   flex: 1 1 auto;
  //   text-align: center;
  // }
`

const promotions = [
  {
    title: 'New Item!',
    subtitle: 'This is a new item!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/local/2/1610935724_italian_1800x1200.jpg',
    color: null,
    vertical: 'bottom',
    horizontal: 'center',
    overlay: true,
  },
  {
    title: 'New Item!',
    subtitle: 'This is a new item!',
    image_url:
      'https://s3.amazonaws.com/betterboh/u/img/local/2/1613691230_sweet-potatoes_1800x1200.jpg',
    color: null,
    vertical: 'bottom',
    horizontal: 'center',
    overlay: true,
  },
  {
    title: 'New Item!',
    subtitle: 'This is a new item!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608048551_jarritos-pineapple_1800x1200.jpg',
    color: null,
    vertical: 'bottom',
    horizontal: 'center',
    overlay: true,
  },
]

const makeSlides = (promotions) => {
  const items = promotions
    .filter((i) => i.image_url)
    .map((i) => ({ ...i, imageUrl: i.image_url }))
  return items.map((i) => (
    <Hero key={i.imageUrl} {...i}>
      <HeroContent {...i} />
    </Hero>
  ))
}

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { error: thanxError } = useSelector(selectCustomerThanx)
  const loyalty = useSelector(selectCustomerRewards)
  const { progress, rewards } = loyalty || {}
  // const rewardsLoading = useSelector(selectCustomerRewardsLoading)
  // const hasRewards = rewards && !rewardsLoading
  const { background, mobile, title, subtitle } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const token = auth ? auth.access_token : null
  const { windowRef } = useContext(AppContext)
  const slides = makeSlides(promotions)

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
      <Content
      // maxWidth="76.8rem"
      // hasFooter={isBrowser ? true : false}
      >
        <HeaderMobile
          // bgColor={isBrowser ? 'primary' : 'transparent'}
          // borderColor={isBrowser ? 'primary' : 'transparent'}
          // maxWidth="76.8rem"
          bgColor="primary"
          borderColor="primary"
          left={<HeaderLogo />}
          right={
            <>
              {!isBrowser && <AccountScan />}
              <Logout />
            </>
          }
        />
        <Main>
          <AccountTabs />
          {/* <Hero imageUrl={mobile || background}>&nbsp;</Hero> */}
          <Slider slides={slides} />
          <AccountContent>
            <Container>
              <WelcomeHeader title={pageTitle} subtitle={subtitle} />
              <AccountActions />
            </Container>
          </AccountContent>
          {progress && <AccountProgress loyalty={loyalty} />}
          {rewards && <AccountRewards rewards={rewards} />}
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
