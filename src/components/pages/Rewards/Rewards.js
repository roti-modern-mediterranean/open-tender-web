import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { AppContext } from '../../../App'
import { selectBrand, selectConfig } from '../../../slices'
import { Content, HeaderDefault, Main, PageContainer, PageTitle } from '../..'
import AccountTabs from '../Account/AccountTabs'
import LoyaltyProgams from './LoyaltyProgams'
import ThanxLoyalty from './ThanxLoyalty'
import LevelUpLoyalty from './LevelUpLoyalty'

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx, has_levelup } = useSelector(selectBrand)
  const { account } = useSelector(selectConfig)
  const config = has_levelup ? account.levelup : account.loyalty
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return auth ? (
    <>
      <Helmet>
        <title>Rewards | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageContainer>
            <PageTitle {...config} />
            {has_levelup ? (
              <LevelUpLoyalty />
            ) : has_thanx ? (
              <ThanxLoyalty />
            ) : (
              <>
                <LoyaltyProgams />
                {/* <RewardsSection limit={null} /> */}
              </>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
