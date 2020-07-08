import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerOrders,
  selectCustomerOrders,
} from 'open-tender-redux'
import { makeUniqueDisplayItems } from 'open-tender-js'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'

const AccountItemsPage = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const [items, setItems] = useState([])
  const {
    recentItems: { title, subtitle, empty },
  } = useSelector(selectConfigAccountSections)
  const { auth } = useSelector(selectCustomer)
  const { entities, loading, error } = useSelector(selectCustomerOrders)
  const isLoading = loading === 'pending'
  const showItems = !isLoading && !error
  const limit = 50

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
    dispatch(fetchCustomerOrders(limit))
  }, [dispatch])

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    const recentItems = displayItems.slice(0, 100)
    setItems(recentItems)
  }, [entities])

  return auth ? (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="sections ot-bg-color-secondary">
        <div ref={sectionRef} className="section">
          <div className="container">
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
                {showItems &&
                  (items.length ? (
                    <div className="section__items">
                      {items.map((item) => {
                        return (
                          <div key={item.signature} className="section__item">
                            <OrderItemCard item={item} />
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <SectionEmpty message={empty} />
                  ))}
              </div>
              <SectionFooter>
                <Link to="/account">Head back to your account page</Link>
              </SectionFooter>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
}

AccountItemsPage.displayName = 'AccountItemsPage'
export default AccountItemsPage
