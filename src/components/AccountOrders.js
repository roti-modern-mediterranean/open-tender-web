import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectToken } from '../slices/customerSlice'
import { selectAccountOrders, fetchOrders } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'
import { slugify } from '../packages/utils/helpers'

const AccountOrders = () => {
  const dispatch = useDispatch()
  const {
    recentOrders: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const orders = useSelector(selectAccountOrders)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'
  const showOrders = !isLoading && !error
  const recentOrders = entities.length ? entities.slice(0, 6) : []

  useEffect(() => {
    dispatch(fetchOrders({ token, limit: 10 }))
  }, [dispatch, token])

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        <div className="section__content -wide">
          {showOrders &&
            (recentOrders.length ? (
              <div className="section__orders">
                {recentOrders.map((order) => {
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
    </div>
  )
}

AccountOrders.displayName = 'AccountOrders'
export default AccountOrders
