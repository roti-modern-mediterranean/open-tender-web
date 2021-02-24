import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomerFavorites } from '@open-tender/redux'
import { makeDisplayItem } from '@open-tender/js'

import { ItemsScrollable, OrderCardItem, Section, SectionHeader } from '../..'

const AccountFavorites = () => {
  const { entities } = useSelector(selectCustomerFavorites)
  if (!entities.length) return null
  const filtered = entities
    .map((i) => ({ ...makeDisplayItem(i.item) }))
    .map((i, index) => ({ ...i, key: `${i.id}-${index}` }))
    .slice(0, 8)

  return (
    <Section>
      <SectionHeader title="Your Favorites" to="/favorites" />
      <ItemsScrollable
        items={filtered}
        renderItem={(item) => <OrderCardItem item={item} />}
        width="18rem"
      />
    </Section>
  )
}

AccountFavorites.displayName = 'AccountFavorites'

export default AccountFavorites
