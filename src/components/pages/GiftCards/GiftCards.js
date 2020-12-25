import React, { useCallback, useContext, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Minus, Plus } from 'react-feather'
import { Link } from 'react-router-dom'
import { GiftCardsForm } from '@open-tender/components'
import {
  selectGiftCards,
  resetGiftCards,
  purchaseGiftCards,
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderMobile,
  Main,
  PageTitle,
  PageContent,
} from '../..'
import { Account, StartOver } from '../../buttons'
import { AppContext } from '../../../App'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const GiftCards = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const { title } = useSelector(selectBrand)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const { entities: creditCards } = useSelector(selectCustomerCreditCards) || {}
  const { success, loading, error, giftCards } = useSelector(selectGiftCards)
  const purchase = useCallback(
    (data, callback) => dispatch(purchaseGiftCards(data, callback)),
    [dispatch]
  )
  const reset = useCallback(() => dispatch(resetGiftCards()), [dispatch])
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (success || error) window.scroll(0, 0)
  }, [success, error])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch, customer])

  useEffect(() => {
    return () => dispatch(resetGiftCards())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.giftCards.title} | {title}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.giftCards.background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          maxWidth="76.8rem"
          left={<StartOver />}
          right={<Account />}
        />
        <Main>
          <Container>
            <PageTitle {...config.giftCards} />
            <PageContent>
              <GiftCardsForm
                customer={customer}
                creditCards={creditCards}
                purchase={purchase}
                reset={reset}
                success={success}
                purchasedCards={giftCards}
                loading={loading}
                error={error}
                iconMap={iconMap}
              />
              {success && (
                <p>
                  {customer ? (
                    <Link to="/account">Head back to your account page</Link>
                  ) : (
                    <Link to="/">
                      Head back to the home page to start an order
                    </Link>
                  )}
                </p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

GiftCards.displayName = 'GiftCards'
export default GiftCards
