import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from 'open-tender-redux'
import { Button } from 'open-tender'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'
import SectionFooter from './SectionFooter'

const AccountOrdersPage = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const increment = 12
  const limit = 120
  const [recentOrders, setRecentOrders] = useState([])
  const [count, setCount] = useState(increment)
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
      <h1 className="sr-only">{title}</h1>
      <div className="sections ot-bg-color-secondary">
        <div ref={sectionRef} className="section container">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle}>
              <div className="section__header__back">
                <p className="ot-font-size-small">
                  <Link to="/account">Head back to your account page</Link>
                </p>
              </div>
            </SectionHeader>
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
    </>
  ) : null
}

AccountOrdersPage.displayName = 'AccountOrdersPage'
export default AccountOrdersPage
