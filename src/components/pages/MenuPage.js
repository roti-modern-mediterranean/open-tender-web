import React, { useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'
import { validateCart } from '../../packages/utils/cart'
import { selectConfig } from '../../slices/configSlice'
import {
  selectLocation,
  selectMenuVars,
  selectCart,
  setCart,
  fetchLocation,
} from '../../slices/orderSlice'
import { fetchMenu, selectMenu, setCartErrors } from '../../slices/menuSlice'
import Hero from '../Hero'
import { Location } from '../Location'
import Menu from '../Menu'
import { openModal } from '../../slices/modalSlice'

export const MenuContext = createContext(null)

const MenuPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)
  const location = useSelector(selectLocation)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)
  const { categories, soldOut, error, loading } = useSelector(selectMenu)
  const cart = useSelector(selectCart)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!locationId) {
      return history.push('/locations')
    } else {
      dispatch(fetchLocation(locationId))
      dispatch(fetchMenu([locationId, serviceType, requestedAt]))
    }
  }, [locationId, serviceType, requestedAt, dispatch, history])

  useEffect(() => {
    // console.log('old cart =>')
    // printCart(cart)
    const { newCart, errors } = validateCart(cart, categories, soldOut)
    // console.log('new cart =>')
    // printCart(newCart)
    // console.log('cart errors', errors)
    if (errors) {
      dispatch(setCartErrors({ newCart, errors }))
      dispatch(openModal('cartErrors'))
    } else {
      dispatch(setCart(newCart))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, soldOut])

  return (
    <MenuContext.Provider value={{ soldOut, menuConfig }}>
      <Hero imageUrl={menuConfig.background} classes="hero--right">
        {location && (
          <Location location={location} classes="location--hero slide-up" />
        )}
      </Hero>
      <h1 className="sr-only">Menu</h1>
      {isLoading ? (
        <div className="loading">
          <div className="loading__loader">
            <BarLoader size={100} laoding={isLoading} />
          </div>
        </div>
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
