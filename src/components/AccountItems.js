import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { selectCustomerOrders } from '@open-tender/redux'
import { slugify, makeUniqueDisplayItems } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'

const AccountItems = () => {
  const limit = 9
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [count, setCount] = useState(isBrowser ? 3 : limit)
  const {
    recentItems: { title, subtitle, empty },
  } = useSelector(selectConfigAccountSections)
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders

  const isLoading = loading === 'pending'
  const showItems = !isLoading && !error

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    setAllItems(displayItems)
    const recentItems = displayItems.slice(0, count)
    setItems(recentItems)
  }, [entities, count])

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
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
          {/* <div className="section__footer">
            <p className="ot-font-size-small">
              <Link to="/items" className="">
                See more recently ordered items
              </Link>
            </p>
          </div> */}
          {allItems.length > count ? (
            <SectionFooter>
              {count === limit ? (
                <Link to="/items">See all recent items</Link>
              ) : (
                <Button classes="ot-btn-link" onClick={() => setCount(limit)}>
                  Load more recent items
                </Button>
              )}
            </SectionFooter>
          ) : null}
        </div>
      </div>
    </div>
  )
}

AccountItems.displayName = 'AccountItems'
export default AccountItems
