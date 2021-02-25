import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomerGiftCards,
  fetchCustomerGiftCards,
} from '@open-tender/redux'

import { GiftCard, ItemsScrollable, Section, SectionHeader } from '../..'

const AccountGiftCards = () => {
  const dispatch = useDispatch()
  const { entities: giftCards, loading } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const filtered = giftCards
    .map((i) => ({ ...i, key: i.gift_card_id, isLoading }))
    .slice(0, 5)

  useEffect(() => {
    dispatch(fetchCustomerGiftCards())
  }, [dispatch])

  if (!giftCards.length) return null

  return (
    <Section>
      <SectionHeader title="Gift Cards" to="/account/gift-cards" />
      <ItemsScrollable
        items={filtered}
        renderItem={(giftCard) => <GiftCard giftCard={giftCard} />}
      />
    </Section>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
