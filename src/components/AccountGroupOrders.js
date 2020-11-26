import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCustomerGroupOrders,
  selectCustomerGroupOrders,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import GroupOrderCard from './GroupOrderCard'

const AccountGroupOrders = () => {
  const dispatch = useDispatch()
  const [groupOrders, setGroupOrders] = useState([])
  const { groupOrders: groupOrdersConfig } = useSelector(selectAccountConfig)
  const { title, subtitle } = groupOrdersConfig || {}
  const { entities, loading, error } = useSelector(selectCustomerGroupOrders)
  const limit = 5

  useEffect(() => {
    dispatch(fetchCustomerGroupOrders())
  }, [dispatch])

  useEffect(() => {
    const recent = entities.length ? entities.slice(0, limit) : []
    setGroupOrders(recent)
  }, [entities, limit])

  return groupOrders.length > 0 ? (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={loading === 'pending'} />
          <SectionError error={error} />
          <div className="section__content">
            <div className="section__items">
              {groupOrders.map((order) => {
                return (
                  <div key={order.cart_id} className="section__item">
                    <GroupOrderCard groupOrder={order} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

AccountGroupOrders.displayName = 'AccountGroupOrders'
export default AccountGroupOrders
