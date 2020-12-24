import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCustomerGiftCards } from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { Button } from '@open-tender/components'

import { selectAccountConfig, selectBrand, openModal } from '../../../slices'
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

const GiftCardButtons = ({ purchase, purchaseOthers, addToAccount }) => (
  <div className="section__buttons">
    <Button text="Buy A New Gift Card" onClick={purchase} classes="ot-btn" />{' '}
    <Button
      text="Buy Gift Cards For Others"
      onClick={purchaseOthers}
      classes="ot-btn"
    />{' '}
    <Button
      text="Add Gift Card To Account"
      onClick={addToAccount}
      classes="ot-btn"
    />
  </div>
)

const AccountGiftCards = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'

  const purchase = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'giftCard' }))
    evt.target.blur()
  }

  const purchaseOthers = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    history.push('/gift-cards')
  }

  const addToAccount = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'giftCardAssign' }))
    evt.target.blur()
  }

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
              <GiftCardButtons
                purchase={purchase}
                purchaseOthers={purchaseOthers}
                addToAccount={addToAccount}
              />
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
