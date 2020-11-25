import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCustomerOrders } from '@open-tender/redux'
import { slugify, makeUniqueDisplayItems } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'

const AccountItems = () => {
  const history = useHistory()
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const {
    recentItems: { title, subtitle, empty },
  } = useSelector(selectAccountConfig)
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders
  const limit = 5

  const isLoading = loading === 'pending'
  const showItems = !isLoading && !error

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    setAllItems(displayItems)
    const recentItems = displayItems.slice(0, limit)
    setItems(recentItems)
  }, [entities, limit])

  const seeAll = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    history.push('/items')
  }

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
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
          {allItems.length > limit ? (
            <SectionFooter>
              <Button classes="ot-btn" onClick={seeAll}>
                See all recent items
              </Button>
            </SectionFooter>
          ) : null}
        </div>
      </div>
    </div>
  )
}

AccountItems.displayName = 'AccountItems'
export default AccountItems
