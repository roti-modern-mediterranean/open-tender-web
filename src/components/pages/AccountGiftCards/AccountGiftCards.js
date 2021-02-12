import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomer,
  selectCustomerGiftCards,
  fetchCustomerGiftCards,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Container,
  Content,
  Loading,
  Main,
  PageTitle,
  PageContent,
  HeaderAccount,
  Background,
} from '../..'
import GiftCardsList from './GiftCardsList'
import GiftCardButtons from './GiftCardsButtons'

const AccountGiftCards = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { entities, loading } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerGiftCards())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.giftCards.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={isBrowser ? null : 'Gift Cards'}
          maxWidth="76.8rem"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.giftCards} />
            <PageContent>
              <GiftCardButtons />
              {entities.length ? (
                <GiftCardsList giftCards={entities} isLoading={isLoading} />
              ) : isLoading ? (
                <Loading text="Retrieving your gift cards..." />
              ) : (
                <p>{config.giftCards.empty}</p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
