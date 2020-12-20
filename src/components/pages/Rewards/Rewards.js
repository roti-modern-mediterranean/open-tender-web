import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import AccountThanx from '../../AccountThanx'
import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderAccount,
  Main,
  PageTitle,
} from '../..'
import RewardsPrograms from './RewardsProgams'

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background } = accountConfig
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

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
        <HeaderAccount maxWidth="76.8rem" />
        <Main bgColor="secondary">
          <Container>
            <PageTitle
              title="Rewards"
              subtitle="A summary of your current rewards progress"
            />
            {has_thanx ? <AccountThanx /> : <RewardsPrograms />}
          </Container>
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
