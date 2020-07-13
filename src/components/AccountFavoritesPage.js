import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerFavorites,
  fetchCustomerFavorites,
  selectCustomer,
} from '@open-tender/redux'
import { makeDisplayItem } from '@open-tender/js'

import { selectConfigAccountSections } from '../slices'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderItemCard from './OrderItemCard'
import SectionFooter from './SectionFooter'
import PageTitle from './PageTitle'
import AccountBackground from './AccountBackground'

const AccountFavoritesPage = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const [favorites, setFavorites] = useState([])
  const {
    favorites: { title, subtitle, empty },
  } = useSelector(selectConfigAccountSections)
  const { auth } = useSelector(selectCustomer)
  const { entities, loading, error } = useSelector(selectCustomerFavorites)
  const isLoading = loading === 'pending'

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
    dispatch(fetchCustomerFavorites())
  }, [dispatch])

  useEffect(() => {
    const items = entities.map((i) => ({ ...i, item: makeDisplayItem(i.item) }))
    setFavorites(items)
  }, [entities])

  return auth ? (
    <>
      <AccountBackground />
      <div ref={sectionRef} className="content">
        <PageTitle title={title} subtitle={subtitle} />
        <div className="section">
          <div className="container">
            <div className="section__container">
              <SectionLoading loading={isLoading} />
              <SectionError error={error} />
              <div className="section__content">
                {favorites.length ? (
                  <div className="section__items">
                    {favorites.map((favorite) => {
                      return (
                        <div
                          key={favorite.favorite_id}
                          className="section__item"
                        >
                          <OrderItemCard item={favorite.item} />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <SectionEmpty message={empty} />
                )}
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

AccountFavoritesPage.displayName = 'AccountFavoritesPage'
export default AccountFavoritesPage
