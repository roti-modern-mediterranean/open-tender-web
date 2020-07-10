import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerOrders,
  selectCustomerOrders,
} from '@open-tender/redux'
import { makeUniqueDisplayItems } from '@open-tender/js'

import { selectConfigAccountSections } from '../slices'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'
import AccountBackground from './AccountBackground'
import PageTitle from './PageTitle'

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
      <AccountBackground />
      <div ref={sectionRef} className="content">
        <PageTitle title={title} subtitle={subtitle} />
        <div className="section">
          <div className="container">
            <div className="section__container">
              {isLoading && <SectionLoading loading={isLoading} />}
              <SectionError error={error} />
              <div className="section__content">
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
