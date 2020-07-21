import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  fetchMenuItems,
  fetchRevenueCenter,
  setOrderServiceType,
  setAddress,
  selectCartQuantity,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'
import SectionFooter from './SectionFooter'

const AccountOrders = () => {
  const dispatch = useDispatch()
  const limit = 9
  const [recentOrders, setRecentOrders] = useState([])
  const [count, setCount] = useState(isBrowser ? 3 : limit)
  const {
    recentOrders: { title, subtitle, empty },
  } = useSelector(selectAccountConfig)
  const orders = useSelector(selectCustomerOrders)
  const cartQuantity = useSelector(selectCartQuantity)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'
  const showOrders = !isLoading && !error

  useEffect(() => {
    dispatch(fetchCustomerOrders(limit + 1))
  }, [dispatch])

  useEffect(() => {
    const recent = entities.length ? entities.slice(0, count) : []
    setRecentOrders(recent)
  }, [entities, count])

  useEffect(() => {
    const lastOrder = entities.length ? entities[0] : null
    if (lastOrder) {
      const { revenue_center, service_type, order_type, address } = lastOrder
      const { revenue_center_id: revenueCenterId } = revenue_center
      dispatch(fetchMenuItems({ revenueCenterId, serviceType: service_type }))
      if (!cartQuantity) {
        const isOutpost = revenue_center.is_outpost
        dispatch(fetchRevenueCenter(revenueCenterId))
        dispatch(setOrderServiceType(order_type, service_type, isOutpost))
        dispatch(setAddress(address || null))
      }
    }
  }, [entities, cartQuantity, dispatch])

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          <div className="section__content -wide">
            {showOrders &&
              (recentOrders.length ? (
                <div className="section__items">
                  {recentOrders.map((order) => {
                    return (
                      <div key={order.order_id} className="section__item">
                        <OrderCard order={order} />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <SectionEmpty message={empty} />
              ))}
          </div>
          {entities.length > count ? (
            <SectionFooter>
              {count === limit ? (
                <Link to="/orders">See all recent orders</Link>
              ) : (
                <Button classes="ot-btn-link" onClick={() => setCount(limit)}>
                  Load more recent orders
                </Button>
              )}
            </SectionFooter>
          ) : null}
        </div>
      </div>
    </div>
  )
}

AccountOrders.displayName = 'AccountOrders'
export default AccountOrders
