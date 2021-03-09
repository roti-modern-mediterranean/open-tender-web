import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Content,
  HeaderDefault,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageError,
  PageTitle,
  Reward,
} from '../..'
import { AppContext } from '../../../App'
import AccountTabs from '../Account/AccountTabs'
import styled from '@emotion/styled'

const defaultConfig = {
  title: 'Deals',
  subtitle: 'Daily offers available to all customers. Check back daily!',
}

const DealsView = styled('div')`
  margin: -1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: -0.5rem;
    justify-content: center;
  }
`

const Deal = styled('div')`
  width: 33.33333%;
  padding: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 50%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0.5rem;
  }
`

const Deals = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const config = { ...accountConfig, ...defaultConfig }
  const { background } = config
  const { auth, profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { windowRef } = useContext(AppContext)
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!has_deals) return history.push('/')
  }, [has_deals, history])

  useEffect(() => {
    dispatch(fetchDeals())
  }, [dispatch, customer_id])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={background} />
      <Content>
        {auth ? (
          <HeaderUser title={isBrowser ? null : config.title} />
        ) : (
          <HeaderDefault title={isBrowser ? null : config.title} />
        )}
        <Main>
          {!isBrowser && auth && <AccountTabs />}
          <PageContainer>
            <PageTitle {...config} />
            {error ? (
              <PageError error={error} />
            ) : hasDeals ? (
              <DealsView>
                {deals.map((deal) => (
                  <Deal key={deal.discount_id}>
                    <Reward item={deal} />
                  </Deal>
                ))}
              </DealsView>
            ) : loading === 'pending' ? (
              <Loading text="Retrieving today's deals..." />
            ) : (
              <p>
                We're not featuring any deals today. Please check back soon!
              </p>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Deals.displayName = 'Deals'
export default Deals
