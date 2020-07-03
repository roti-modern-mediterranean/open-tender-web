import React, { useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectRevenueCenter,
  selectMenuVars,
  fetchRevenueCenter,
  resetRevenueCenter,
  fetchMenu,
  selectMenu,
  selectSelectedAllergenNames,
  fetchAllergens,
} from 'open-tender-redux'
import { Button } from 'open-tender'

import { selectConfig } from '../slices'
import Hero from './Hero'
import Menu from './Menu'
import RevenueCenter from './RevenueCenter'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

export const MenuContext = createContext(null)

const MenuPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)
  const revenueCenter = useSelector(selectRevenueCenter)
  const { revenueCenterId, serviceType, requestedAt } = useSelector(
    selectMenuVars
  )
  const { categories, soldOut, error, loading } = useSelector(selectMenu)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!revenueCenterId) {
      return history.push('/locations')
    } else {
      dispatch(fetchRevenueCenter(revenueCenterId))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      dispatch(fetchAllergens())
    }
  }, [revenueCenterId, serviceType, requestedAt, dispatch, history])

  const changeLocation = (evt) => {
    evt.preventDefault()
    dispatch(resetRevenueCenter())
    evt.target.blur()
  }

  return (
    <MenuContext.Provider value={{ soldOut, menuConfig, allergenAlerts }}>
      <Hero imageUrl={menuConfig.background} classes="hero--right">
        {revenueCenter && (
          <RevenueCenter
            revenueCenter={revenueCenter}
            classes="rc--hero slide-up"
          />
        )}
      </Hero>
      <h1 className="sr-only">Menu</h1>
      {isLoading ? (
        <Loader text={menuConfig.loading} />
      ) : error ? (
        <ErrorMessage title="Menu Not Found" msg={error}>
          <Button
            text="Change Location"
            icon="RefreshCw"
            classes="btn btn--error"
            onClick={changeLocation}
          />
        </ErrorMessage>
      ) : (
        <Menu categories={categories} soldOut={soldOut} />
      )}
    </MenuContext.Provider>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
