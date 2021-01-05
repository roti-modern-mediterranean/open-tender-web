import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, selectConfig, selectSettings } from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderAccount,
  Main,
  PageContent,
  PageTitle,
} from '../..'
import RewardsPrograms from './RewardsProgams'
import RewardsThanx from './RewardsThanx'
import { AppContext } from '../../../App'
import RewardsLevelUp from './RewardsLevelUp'

const defaultConfig = {
  title: 'Rewards',
  subtitle: 'A summary of your current rewards progress',
}

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx: hasThanx } = useSelector(selectBrand)
  const { accountSections } = useSelector(selectSettings)
  const hasLevelUp = accountSections.filter((i) => i === 'levelup').length > 0
  const { account: accountConfig } = useSelector(selectConfig)
  const config = hasLevelUp ? accountConfig.levelup : defaultConfig
  const { background } = accountConfig
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return auth ? (
    <>
      <Helmet>
        <title>Rewards | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={isBrowser ? null : 'Rewards'}
          maxWidth="76.8rem"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config} />
            <PageContent>
              {hasLevelUp ? (
                <RewardsLevelUp />
              ) : hasThanx ? (
                <RewardsThanx />
              ) : (
                <RewardsPrograms />
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
