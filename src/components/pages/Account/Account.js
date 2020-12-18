import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectCustomer, fetchCustomer } from '@open-tender/redux'
import { Menu } from 'react-feather'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Content,
  HeaderButton,
  HeaderLogo,
  HeaderMobile,
  Main,
  Welcome,
} from '../..'
import AccountActions from './AccountActions'
import AccountButtons from './AccountButtons'

// const AccountSection = ({ section }) => sections[section]

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
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

  return profile ? (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="transparent"
          maxWidth="76.8rem"
          left={
            <HeaderButton color="light" onClick={() => console.log('clicked')}>
              <Menu size={20} />
            </HeaderButton>
          }
          right={<HeaderLogo />}
        />
        <Main padding="0" imageUrl={background}>
          <Welcome
            // imageUrl={background}
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
