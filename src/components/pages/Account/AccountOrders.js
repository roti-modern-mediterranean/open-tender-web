import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomerOrders } from '@open-tender/redux'

import { ItemsScrollable, OrderCard, Section, SectionHeader } from '../..'

const AccountOrders = () => {
  const { entities: orders, error } = useSelector(selectCustomerOrders)
  if (!orders.length || error) return null
  const filtered = orders.map((i) => ({ ...i, key: i.order_id })).slice(0, 5)

  return (
    <Section>
      <SectionHeader title="Recent Orders" to="/orders" />
      <ItemsScrollable
        items={filtered}
        renderItem={(order) => <OrderCard order={order} />}
      />
    </Section>
  )
}

AccountOrders.displayName = 'AccountOrders'

export default AccountOrders
