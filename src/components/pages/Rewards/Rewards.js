import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
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

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background } = accountConfig
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
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
        <HeaderAccount title="Rewards" maxWidth="76.8rem" />
        <Main bgColor="secondary">
          <Container>
            <PageTitle
              title="Rewards"
              subtitle="A summary of your current rewards progress"
            />
            <PageContent>
              {has_thanx ? <RewardsThanx /> : <RewardsPrograms />}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
