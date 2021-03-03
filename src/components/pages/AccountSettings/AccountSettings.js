import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Content,
  HeaderUser,
  Main,
  PageHeader,
  PageHero,
  PageView,
  VerifyAccount,
} from '../..'
import AccountSettingsButtons from './AccountSettingsButtons'
import { isBrowser } from 'react-device-detect'
import AccountTabs from '../Account/AccountTabs'
import iconMap from '../../iconMap'

const AccountSettings = () => {
  const history = useHistory()
  const dispatch = useDispatch()
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
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem" hasFooter={false}>
        <HeaderUser
          title={isBrowser ? null : 'Account'}
          maxWidth="76.8rem"
          bgColor="primary"
          borderColor="primary"
        />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageView style={!isBrowser ? { paddingBottom: '6rem' } : null}>
            {!isBrowser && <PageHero>&nbsp;</PageHero>}
            <PageHeader
              title="Account"
              subtitle="Manage saved credit cards, addresses, etc."
            >
              <div style={{ margin: '1.5rem 0 0' }}>
                <p>
                  {/* <ButtonLink onClick={() => dispatch(logoutCustomer())}>
                  Log out of your account
                </ButtonLink> */}
                  <ButtonStyled
                    icon={iconMap.Logout}
                    onClick={() => dispatch(logoutCustomer())}
                    color="secondary"
                    size="small"
                  >
                    Log out of your account
                  </ButtonStyled>
                </p>
                <VerifyAccount style={{ margin: '2rem 0 0' }} />
              </div>
            </PageHeader>
            <AccountSettingsButtons />
          </PageView>
        </Main>
      </Content>
    </>
  ) : null
}

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings
