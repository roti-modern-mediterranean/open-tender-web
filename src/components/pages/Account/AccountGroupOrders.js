import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomerGroupOrders,
  fetchCustomerGroupOrders,
} from '@open-tender/redux'

import { ItemsScrollable, OrderCardGroup, Section, SectionHeader } from '../..'

const AccountGroupOrders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectCustomerGroupOrders)
  const { entities: groupOrders, error } = orders
  const filtered = groupOrders
    .map((i) => ({ ...i, key: i.order_id }))
    .slice(0, 5)

  useEffect(() => {
    dispatch(fetchCustomerGroupOrders())
  }, [dispatch])

  if (!filtered.length || error) return null

  return (
    <Section>
      <SectionHeader title="Open Group Orders" to="/group-orders" />
      <ItemsScrollable
        items={filtered}
        renderItem={(order) => <OrderCardGroup order={order} />}
      />
    </Section>
  )
}

AccountGroupOrders.displayName = 'AccountGroupOrders'

export default AccountGroupOrders
