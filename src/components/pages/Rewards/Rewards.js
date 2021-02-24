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
  Background,
  Container,
  Content,
  HeaderUser,
  Main,
  PageContent,
} from '../..'
import LoyaltyProgams from './LoyaltyProgams'
import Thanx from './Thanx'
import LevelUp from './LevelUp'
import AccountTabs from '../Account/AccountTabs'
import RewardsList from './RewardsList'

// const defaultConfig = {
//   title: 'Rewards',
//   subtitle: 'A summary of your current rewards progress',
// }

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx, has_levelup } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  // const config = has_levelup ? accountConfig.levelup : defaultConfig
  const { background } = accountConfig
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
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderUser
          title={isBrowser ? null : 'Rewards'}
          maxWidth="76.8rem"
          bgColor="secondary"
          borderColor="secondary"
        />
        <Main bgColor="secondary">
          {!isBrowser && <AccountTabs />}
          <Container>
            <PageContent>
              {has_levelup ? (
                <LevelUp />
              ) : has_thanx ? (
                <Thanx />
              ) : (
                <>
                  <LoyaltyProgams />
                  <RewardsList />
                </>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
