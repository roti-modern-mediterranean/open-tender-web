import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCustomer, selectCustomerGiftCards } from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

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
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return (
    <>
      <Helmet>
        <title>
          {config.giftCards.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount title="Gift Cards" maxWidth="76.8rem" />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.giftCards} />
            <PageContent>
              <GiftCardButtons />
              {entities.length ? (
                <GiftCardsList giftCards={entities} isLoading={isLoading} />
              ) : isLoading ? (
                <Loading text="Retrieving your gift cards..." />
              ) : error ? (
                <p>{error}</p>
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
