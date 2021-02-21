import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Content,
  HeaderMobile,
  Main,
  Welcome,
  WelcomeHeader,
} from '../..'
import AccountSettingsButtons from './AccountSettingsButtons'
import { Home, Logout } from '../../buttons'

const AccountSettingsView = styled('div')`
  padding: 2.5rem;
`

const AccountSettings = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return profile ? (
    <>
      <Helmet>
        <title>Account Settings | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          maxWidth="76.8rem"
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          left={<Home color="light" />}
          right={<Logout color="light" />}
        />
        <Main padding="0" imageUrl={background}>
          <Welcome footer={<AccountSettingsButtons />}>
            <AccountSettingsView>
              <WelcomeHeader title="Account" />
            </AccountSettingsView>
          </Welcome>
        </Main>
      </Content>
    </>
  ) : null
}

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings
