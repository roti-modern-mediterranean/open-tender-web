import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { makeUniqueDisplayItems } from '../packages/utils/cart'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectToken, selectCustomer } from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'
import { fetchOrders, selectAccountOrders } from '../slices/accountSlice'

const AccountItemsPage = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const [items, setItems] = useState([])
  const {
    recentItems: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const { account } = useSelector(selectCustomer)
  const { entities, loading, error } = useSelector(selectAccountOrders)
  const isLoading = loading === 'pending'
  const showItems = !isLoading && !error

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!account) return history.push('/')
  }, [account, history])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  useEffect(() => {
    dispatch(fetchOrders({ token, limit: 50 }))
  }, [dispatch, token])

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    const recentItems = displayItems.slice(0, 100)
    setItems(recentItems)
  }, [entities])

  return account ? (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="sections bg-secondary-color">
        <div ref={sectionRef} className="section container ot-section">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle}>
              <div className="section__header__back">
                <p className="font-size-small">
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
    </>
  ) : null
}

AccountItemsPage.displayName = 'AccountItemsPage'
export default AccountItemsPage
