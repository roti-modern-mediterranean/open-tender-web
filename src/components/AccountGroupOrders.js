import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  fetchCustomerGroupOrders,
  selectCustomerGroupOrders,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionFooter from './SectionFooter'
import GroupOrderCard from './GroupOrderCard'

const AccountGroupOrders = () => {
  const dispatch = useDispatch()
  const limit = 9
  const [groupOrders, setGroupOrders] = useState([])
  const [count, setCount] = useState(isBrowser ? 3 : limit)
  const { groupOrders: groupOrdersConfig } = useSelector(selectAccountConfig)
  const { title, subtitle } = groupOrdersConfig || {}
  const orders = useSelector(selectCustomerGroupOrders)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'

  useEffect(() => {
    dispatch(fetchCustomerGroupOrders())
  }, [dispatch])

  useEffect(() => {
    const recent = entities.length ? entities.slice(0, count) : []
    setGroupOrders(recent)
  }, [entities, count])

  const handleCount = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    setCount(limit)
  }

  return groupOrders.length > 0 ? (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
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
          {entities.length > count && limit > count ? (
            <SectionFooter>
              <Button classes="ot-btn-link" onClick={handleCount}>
                Load more group orders
              </Button>
            </SectionFooter>
          ) : null}
        </div>
      </div>
    </div>
  ) : null
}

AccountGroupOrders.displayName = 'AccountGroupOrders'
export default AccountGroupOrders
