import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomerFavorites,
  fetchCustomerFavorites,
} from '@open-tender/redux'
import { slugify, makeDisplayItem } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'

const AccountFavorites = () => {
  const dispatch = useDispatch()
  const limit = 9
  const [favorites, setFavorites] = useState([])
  const [count, setCount] = useState(isBrowser ? 3 : limit)
  const {
    favorites: { title, subtitle, empty },
  } = useSelector(selectConfigAccountSections)
  const { entities, loading, error } = useSelector(selectCustomerFavorites)
  const isLoading = loading === 'pending'

  useEffect(() => {
    dispatch(fetchCustomerFavorites())
  }, [dispatch])

  useEffect(() => {
    const items = entities
      .map((i) => ({ ...i, item: makeDisplayItem(i.item) }))
      .slice(0, count)
    setFavorites(items)
  }, [entities, count])

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          <div className="section__content">
            {favorites.length ? (
              <div className="section__items">
                {favorites.map((favorite) => {
                  return (
                    <div key={favorite.favorite_id} className="section__item">
                      <OrderItemCard item={favorite.item} />
                    </div>
                  )
                })}
              </div>
            ) : (
              <SectionEmpty message={empty} />
            )}
          </div>
          {entities.length > count ? (
            <SectionFooter>
              {count === limit ? (
                <Link to="/favorites">See all favorites</Link>
              ) : (
                <Button classes="ot-btn-link" onClick={() => setCount(limit)}>
                  Load more favorites
                </Button>
              )}
            </SectionFooter>
          ) : null}
        </div>
      </div>
    </div>
  )
}

AccountFavorites.displayName = 'AccountFavorites'
export default AccountFavorites
