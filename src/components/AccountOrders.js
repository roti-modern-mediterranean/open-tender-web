import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectToken } from '../slices/customerSlice'
import { selectAccountOrders, fetchOrders } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'
import { slugify } from '../packages/utils/helpers'
import { Button } from '../packages'
import SectionFooter from './SectionFooter'

const AccountOrders = () => {
  const dispatch = useDispatch()
  const [recentOrders, setRecentOrders] = useState([])
  const [count, setCount] = useState(3)
  const limit = 12
  const {
    recentOrders: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const orders = useSelector(selectAccountOrders)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'
  const showOrders = !isLoading && !error

  useEffect(() => {
    dispatch(fetchOrders({ token, limit: limit + 1 }))
  }, [dispatch, token])

  useEffect(() => {
    const recent = entities.length ? entities.slice(0, count) : []
    setRecentOrders(recent)
  }, [entities, count])

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
        {entities.length > count ? (
          <SectionFooter>
            {count === limit ? (
              <Link to="/orders">See all recent orders</Link>
            ) : (
              <Button classes="btn-link" onClick={() => setCount(limit)}>
                Load more recent orders
              </Button>
            )}
          </SectionFooter>
        ) : null}
      </div>
    </div>
  )
}

AccountOrders.displayName = 'AccountOrders'
export default AccountOrders
