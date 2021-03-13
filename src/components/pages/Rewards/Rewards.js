import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { AppContext } from '../../../App'
import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  Main,
  PageContainer,
  PageTitle,
  RewardsSection,
} from '../..'
import LoyaltyProgams from './LoyaltyProgams'
import Thanx from './Thanx'
import LevelUp from './LevelUp'
import AccountTabs from '../Account/AccountTabs'

const defaultConfig = {
  title: 'Rewards',
  subtitle:
    "A summary of your current loyalty status and a list of any rewards you've earned.",
}

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx, has_levelup } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const config = has_levelup ? accountConfig.levelup : defaultConfig
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
        <HeaderUser title={isBrowser ? null : 'Rewards'} />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageContainer>
            <PageTitle {...config} />
            {has_levelup ? (
              <LevelUp />
            ) : has_thanx ? (
              <Thanx />
            ) : (
              <>
                <LoyaltyProgams />
                <RewardsSection limit={null} />
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
