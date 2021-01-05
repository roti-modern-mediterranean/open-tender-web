import React, { useEffect, createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  selectMenuVars,
  selectGroupOrderClosed,
  selectMenu,
  selectSelectedAllergenNames,
  resetRevenueCenter,
  fetchRevenueCenter,
  fetchMenu,
  fetchAllergens,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Main, ScreenreaderTitle } from '../..'
import MenuContent from './MenuContent'
import MenuHeader from './MenuHeader'
import MenuMobileMenu from './MenuMobileMenu'

export const MenuContext = createContext(null)

const MenuPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const { title: siteTitle } = useSelector(selectBrand)
  const { menu: menuConfig } = useSelector(selectConfig)
  const { loadingMessage } = menuConfig
  const order = useSelector(selectOrder)
  const { orderType, revenueCenter } = order
  const { revenueCenterId, serviceType, requestedAt } = useSelector(
    selectMenuVars
  )
  let { revenueCenters, categories, soldOut, error, loading } = useSelector(
    selectMenu
  )
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const groupOrderClosed = useSelector(selectGroupOrderClosed)
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
  }, [windowRef])

  useEffect(() => {
    if (!revenueCenterId) {
      return history.push('/locations')
    } else if (groupOrderClosed) {
      return history.push('/review')
    } else {
      const requested = orderType === 'CATERING' ? requestedAt : null
      dispatch(fetchRevenueCenter(revenueCenterId, requested))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      dispatch(fetchAllergens())
    }
  }, [
    revenueCenterId,
    orderType,
    serviceType,
    requestedAt,
    dispatch,
    history,
    groupOrderClosed,
  ])

  const changeRevenueCenter = () => {
    dispatch(resetRevenueCenter())
  }

  return (
    <>
      <Helmet>
        <title>Menu | {siteTitle}</title>
      </Helmet>
      <Content>
        <MenuHeader showMenu={showMenu} setShowMenu={setShowMenu} />
        <Main>
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
            <MenuMobileMenu
              order={order}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <ScreenreaderTitle>Menu</ScreenreaderTitle>
            <MenuContent />
          </MenuContext.Provider>
        </Main>
      </Content>
    </>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
