import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { selectConfigAccountSections } from '../slices'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'
import SectionFooter from './SectionFooter'
import AccountBackground from './AccountBackground'
import PageTitle from './PageTitle'

const AccountOrdersPage = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const increment = 12
  const limit = 60
  const [recentOrders, setRecentOrders] = useState([])
  const [count, setCount] = useState(isBrowser ? increment : limit)
  const {
    recentOrders: { title, subtitle, empty },
  } = useSelector(selectConfigAccountSections)
  const { auth } = useSelector(selectCustomer)
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'
  const showOrders = !isLoading && !error

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  useEffect(() => {
    dispatch(fetchCustomerOrders(limit + 1))
  }, [dispatch])

  useEffect(() => {
    const recent = entities.length ? entities.slice(0, count) : []
    setRecentOrders(recent)
  }, [entities, count])

  const handleClick = (evt) => {
    evt.preventDefault()
    setCount(Math.min(count + increment, limit))
    evt.target.blur()
  }

  return auth ? (
    <>
      <AccountBackground />
      <div ref={sectionRef} className="content">
        <PageTitle title={title} subtitle={subtitle} />
        <div className="section">
          <div className="container">
            <div className="section__container">
              {isLoading && <SectionLoading loading={isLoading} />}
              <SectionError error={error} />
              <div className="section__content">
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
              {showOrders &&
                (entities.length > count ? (
                  <SectionFooter>
                    {count === limit || count > entities.length ? (
                      <Link to="/account">Head back to your account page</Link>
                    ) : (
                      <Button classes="ot-btn-link" onClick={handleClick}>
                        Load more recent orders
                      </Button>
                    )}
                  </SectionFooter>
                ) : null)}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
}

AccountOrdersPage.displayName = 'AccountOrdersPage'
export default AccountOrdersPage
