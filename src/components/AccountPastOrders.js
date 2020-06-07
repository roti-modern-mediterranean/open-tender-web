import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAccountConfig } from '../slices/configSlice'
import { selectToken } from '../slices/customerSlice'
import { selectPastOrders, fetchPastOrders } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'

const AccountPastOrders = () => {
  const dispatch = useDispatch()
  const { pastOrders: pastOrdersConfig } = useSelector(selectAccountConfig)
  const { title, subtitle, empty } = pastOrdersConfig
  const token = useSelector(selectToken)
  const pastOrders = useSelector(selectPastOrders)
  const { entities, loading, error } = pastOrders
  const isLoading = loading === 'pending'
  const showEntities = !isLoading && !error

  useEffect(() => {
    dispatch(fetchPastOrders({ token, limit: 10 }))
  }, [dispatch, token])

  return (
    <div className="section container ot-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="section__content">
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showEntities &&
          (entities.length ? (
            <div className="section__orders">
              {entities.map((order) => {
                return (
                  <div key={order.order_id} className="section__order">
                    <OrderCard order={order} />
                  </div>
                )
              })}
            </div>
          ) : (
            <SectionEmpty message={empty} />
          ))}
      </div>
    </div>
  )
}

AccountPastOrders.displayName = 'AccountPastOrders'
export default AccountPastOrders
