import React, { useCallback, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Minus, Plus } from 'react-feather'
import { GiftCardsForm } from '@open-tender/components'
import {
  selectGiftCards,
  resetGiftCards,
  purchaseGiftCards,
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '@open-tender/redux'

import { selectBrand, selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import { Link } from 'react-router-dom'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const GiftCardsPage = () => {
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

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

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
      <div className="content">
        <PageTitle {...config.giftCards} />
        <div className="content__body ot-line-height slide-up">
          <div className="container">
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
            {success && customer ? (
              <p>
                <Link to="/account">Head back to your account page</Link>
              </p>
            ) : (
              <p>
                <Link to="/">Head back to the home page to start an order</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

GiftCardsPage.displayName = 'GiftCardsPage'
export default GiftCardsPage
