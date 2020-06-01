import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAccountConfig } from '../slices/configSlice'
import { selectToken } from '../slices/customerSlice'
import {
  selectUpcomingOrders,
  fetchUpcomingOrders,
} from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionItem from './SectionItem'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'

const AccountUpcomingOrders = () => {
  const dispatch = useDispatch()
  const { upcomingOrders: upcomingOrdersConfig } = useSelector(
    selectAccountConfig
  )
  const { title, subtitle, empty } = upcomingOrdersConfig
  const token = useSelector(selectToken)
  const upcomingOrders = useSelector(selectUpcomingOrders)
  const { entities, loading, error } = upcomingOrders
  const isLoading = loading === 'pending'
  const showEntities = !isLoading && !error
  console.log(upcomingOrders)

  useEffect(() => {
    dispatch(fetchUpcomingOrders({ token }))
  }, [dispatch, token])

  return (
    <div className="section container ot-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="section__content">
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showEntities &&
          (entities.length ? (
            <div className="section__items">
              {entities.map((order) => {
                return (
                  <SectionItem key={order.order_id}>
                    <OrderCard order={order} />
                  </SectionItem>
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

AccountUpcomingOrders.displayName = 'AccountUpcomingOrders'
export default AccountUpcomingOrders
