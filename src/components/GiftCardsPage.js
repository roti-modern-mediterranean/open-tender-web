import React, { useCallback, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { GiftCardsForm } from '@open-tender/components'
import {
  selectGiftCards,
  resetGiftCards,
  purchaseGiftCards,
  selectCustomer,
  selectCustomerCreditCards,
} from '@open-tender/redux'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import { Minus, Plus } from 'react-feather'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const GiftCardsPage = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
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
    return () => dispatch(resetGiftCards())
  }, [dispatch])

  return (
    <>
      {isBrowser && <Background imageUrl={config.giftCards.background} />}
      <div className="content">
        <PageTitle {...config.giftCards} />
        <div className="content__body ot-line-height slide-up">
          <div className="container">
            {/* <div className="content__text">
              {config.giftCards.content &&
                config.giftCards.content.map((i, index) => (
                  <p key={index}>{i}</p>
                ))}
            </div> */}
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
          </div>
        </div>
      </div>
    </>
  )
}

GiftCardsPage.displayName = 'GiftCardsPage'
export default GiftCardsPage
