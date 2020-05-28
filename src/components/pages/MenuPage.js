import React, { useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'
import { validateCart, printCart } from '../../packages/utils/cart'
import { selectConfig } from '../../slices/configSlice'
import {
  selectLocation,
  selectMenuVars,
  selectCart,
} from '../../slices/orderSlice'
import { fetchMenu, selectMenu } from '../../slices/menuSlice'
import Hero from '../Hero'
import { Location } from '../Location'
import Menu from '../Menu'

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
    const requestedIso =
      requestedAt === 'asap' ? new Date().toISOString() : requestedAt
    locationId
      ? dispatch(fetchMenu([locationId, serviceType, requestedIso]))
      : history.push('/locations')
  }, [locationId, serviceType, requestedAt, dispatch, history])

  // useEffect(() => {
  //   const {newCart, errors} = validateCart(cart, categories, soldOut)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [categories, soldOut])

  useEffect(() => {
    console.log('old cart =>')
    printCart(cart)
    const { newCart, errors } = validateCart(cart, categories, soldOut)
    // console.log(JSON.stringify(newCart, null, 2))
    console.log('new cart =>')
    printCart(newCart)
    console.log('cart errors', errors)
  })

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
