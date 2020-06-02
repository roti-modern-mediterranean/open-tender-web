import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectToken } from '../slices/customerSlice'
import { selectAccountOrders, fetchOrders } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionItem from './SectionItem'
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
  const showEntities = !isLoading && !error

  useEffect(() => {
    dispatch(fetchOrders({ token, limit: 10 }))
  }, [dispatch, token])

  return (
    <div id={slugify(title)} className="section container ot-section">
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

AccountOrders.displayName = 'AccountOrders'
export default AccountOrders
