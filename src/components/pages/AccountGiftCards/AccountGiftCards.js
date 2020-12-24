import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomerGiftCards } from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

import { selectAccountConfig, selectBrand } from '../../../slices'
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
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'

  return (
    <>
      <Helmet>
        <title>Order History | {siteTitle}</title>
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
                <Loading text="Retrieving your order history..." />
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
