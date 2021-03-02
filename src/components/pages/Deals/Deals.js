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
  Container,
  Content,
  HeaderDefault,
  HeaderUser,
  Loading,
  Main,
  PageContent,
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
  margin: 0 -0.5rem;
  display: flex;
  flex-wrap: wrap;
`

const Deal = styled('div')`
  width: 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
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
      <Content maxWidth="76.8rem">
        {auth ? (
          <HeaderUser
            title={isBrowser ? null : config.title}
            maxWidth="76.8rem"
            bgColor="secondary"
            borderColor="secondary"
          />
        ) : (
          <HeaderDefault
            title={isBrowser ? null : config.title}
            bgColor="secondary"
            borderColor="secondary"
          />
        )}
        <Main bgColor="secondary">
          {!isBrowser && auth && <AccountTabs />}
          <Container>
            <PageTitle {...config} />
            <PageContent>
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
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Deals.displayName = 'Deals'
export default Deals
