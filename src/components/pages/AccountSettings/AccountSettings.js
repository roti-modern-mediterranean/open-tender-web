import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Content,
  HeaderMobile,
  Hero,
  Main,
  PageHeader,
  PageHero,
  PageView,
} from '../..'
import AccountSettingsButtons from './AccountSettingsButtons'
import { Home, Logout } from '../../buttons'
import { isBrowser } from 'react-device-detect'

const AccountSettings = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, mobile } = accountConfig
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
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          maxWidth="76.8rem"
          bgColor="primary"
          borderColor="primary"
          left={<Home />}
          right={<Logout />}
        />
        <Main>
          <PageView>
            {!isBrowser && (
              <PageHero>
                <Hero imageUrl={mobile} style={{ minHeight: '0' }}>
                  &nbsp;
                </Hero>
              </PageHero>
            )}
            <PageHeader
              title="Account"
              subtitle="Manage saved credit cards, addresses, etc."
            />
            <AccountSettingsButtons />
          </PageView>
        </Main>
      </Content>
    </>
  ) : null
}

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings
