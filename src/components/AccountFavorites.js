import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerFavorites,
  fetchCustomerFavorites,
} from '@open-tender/redux'
import { slugify, makeDisplayItem } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'

const AccountFavorites = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [favorites, setFavorites] = useState([])
  const {
    favorites: { title, subtitle, empty },
  } = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerFavorites)
  const isLoading = loading === 'pending'
  const limit = 5

  useEffect(() => {
    dispatch(fetchCustomerFavorites())
  }, [dispatch])

  useEffect(() => {
    const items = entities
      .map((i) => ({ ...i, item: makeDisplayItem(i.item) }))
      .slice(0, limit)
    setFavorites(items)
  }, [entities, limit])

  const seeAll = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    history.push('/favorites')
  }

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          {favorites.length ? (
            <div className="section__content">
              <div className="section__items">
                {favorites.map((favorite) => {
                  return (
                    <div key={favorite.favorite_id} className="section__item">
                      <OrderItemCard item={favorite.item} />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <SectionEmpty message={empty} />
          )}
          {entities.length > limit ? (
            <SectionFooter>
              <Button classes="ot-btn" onClick={seeAll}>
                See all favorites
              </Button>
            </SectionFooter>
          ) : null}
        </div>
      </div>
    </div>
  )
}

AccountFavorites.displayName = 'AccountFavorites'
export default AccountFavorites
