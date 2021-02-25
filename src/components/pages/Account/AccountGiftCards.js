import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomerGiftCards } from '@open-tender/redux'

import { GiftCard, ItemsScrollable, Section, SectionHeader } from '../..'

const AccountGiftCards = () => {
  const { entities: giftCards, loading } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const filtered = giftCards
    .map((i) => ({ ...i, key: i.gift_card_id, isLoading }))
    .slice(0, 5)

  // we don't need this because we get gift cards with the customer
  // useEffect(() => {
  //   dispatch(fetchCustomerGiftCards())
  // }, [dispatch])

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
