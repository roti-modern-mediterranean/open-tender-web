import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { slugify } from 'open-tender-js'
import { makeUniqueDisplayItems } from 'open-tender-js'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectAccountOrders } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'

const AccountItems = () => {
  const [items, setItems] = useState([])
  const {
    recentItems: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const orders = useSelector(selectAccountOrders)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'
  const showItems = !isLoading && !error

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    const recentItems = displayItems.slice(0, 8)
    setItems(recentItems)
  }, [entities])

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
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
        <div className="section__footer">
          <p className="font-size-small">
            <Link to="/items" className="">
              See more recently ordered items
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

AccountItems.displayName = 'AccountItems'
export default AccountItems
