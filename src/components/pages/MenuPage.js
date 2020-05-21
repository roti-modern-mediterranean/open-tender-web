import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'
import { selectConfig } from '../../slices/configSlice'
import { selectLocation, selectMenuVars } from '../../slices/orderSlice'
import { fetchMenu, selectMenu } from '../../slices/menuSlice'
import Hero from '../Hero'
import { Location } from '../Location'
import Menu from '../Menu'

const MenuPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)
  const location = useSelector(selectLocation)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)
  const menu = useSelector(selectMenu)
  const isLoading = menu.loading === 'pending'

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

  return (
    <>
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
      ) : menu.error ? (
        <div className="loading">
          <p className="ot-error-color">{menu.error}</p>
        </div>
      ) : (
        <Menu categories={menu.categories} />
      )}
    </>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
