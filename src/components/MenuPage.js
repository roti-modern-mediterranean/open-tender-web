import React, { useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { validateCart } from '../packages/utils/cart'
import { selectConfig } from '../slices/configSlice'
import {
  selectRevenueCenter,
  selectMenuVars,
  selectCart,
  setCart,
  fetchRevenueCenter,
} from '../slices/orderSlice'
import {
  fetchMenu,
  selectMenu,
  setCartErrors,
  selectedAllergenNames,
  fetchAllergens,
} from '../slices/menuSlice'
import { openModal } from '../slices/modalSlice'
import Hero from './Hero'
import Menu from './Menu'
import RevenueCenter from './RevenueCenter'
import Loader from './Loader'

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
  const allergenAlerts = useSelector(selectedAllergenNames)
  const cart = useSelector(selectCart)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!revenueCenterId) {
      return history.push('/locations')
    } else {
      dispatch(fetchRevenueCenter(revenueCenterId))
      dispatch(fetchMenu([revenueCenterId, serviceType, requestedAt]))
      dispatch(fetchAllergens())
    }
  }, [revenueCenterId, serviceType, requestedAt, dispatch, history])

  useEffect(() => {
    if (categories.length) {
      const { newCart, errors } = validateCart(cart, categories, soldOut)
      if (errors) {
        dispatch(setCartErrors({ newCart, errors }))
        dispatch(openModal({ type: 'cartErrors' }))
      } else {
        dispatch(setCart(newCart))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, soldOut])

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
        <div className="loading">
          <p className="ot-error-color">{error}</p>
        </div>
      ) : (
        <Menu categories={categories} soldOut={soldOut} />
      )}
    </MenuContext.Provider>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
