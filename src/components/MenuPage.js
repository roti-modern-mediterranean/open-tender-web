import React, { useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectRevenueCenter,
  selectMenuVars,
  selectGroupOrderClosed,
  selectMenu,
  selectSelectedAllergenNames,
  resetRevenueCenter,
  fetchRevenueCenter,
  fetchMenu,
  fetchAllergens,
} from '@open-tender/redux'

import { selectConfig } from '../slices'
import Menu from './Menu'

export const MenuContext = createContext(null)

const MenuPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)
  const { loadingMessage } = menuConfig
  const revenueCenter = useSelector(selectRevenueCenter)
  const { revenueCenterId, serviceType, requestedAt } = useSelector(
    selectMenuVars
  )
  const { revenueCenters, categories, soldOut, error, loading } = useSelector(
    selectMenu
  )
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const groupOrderClosed = useSelector(selectGroupOrderClosed)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!revenueCenterId) {
      return history.push('/locations')
    } else if (groupOrderClosed) {
      return history.push('/review')
    } else {
      dispatch(fetchRevenueCenter(revenueCenterId))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      dispatch(fetchAllergens())
    }
  }, [
    revenueCenterId,
    serviceType,
    requestedAt,
    dispatch,
    history,
    groupOrderClosed,
  ])

  const changeRevenueCenter = (evt) => {
    evt.preventDefault()
    dispatch(resetRevenueCenter())
    evt.target.blur()
  }

  return (
    <div className="menu__page">
      <MenuContext.Provider
        value={{
          menuConfig,
          revenueCenter,
          categories,
          revenueCenters,
          changeRevenueCenter,
          soldOut,
          allergenAlerts,
          isLoading,
          loadingMessage,
          error,
        }}
      >
        <h1 className="sr-only">Menu</h1>
        <Menu />
      </MenuContext.Provider>
    </div>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
