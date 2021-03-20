import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isMobile } from 'react-device-detect'
import {
  selectOrder,
  selectMenuVars,
  selectGroupOrderClosed,
  selectGroupOrder,
  selectMenu,
  selectSelectedAllergenNames,
  selectCustomer,
  selectDeals,
  resetRevenueCenter,
  fetchRevenueCenter,
  fetchMenu,
  fetchAllergens,
  fetchDeals,
} from '@open-tender/redux'
import { makeValidDeals } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, HeaderDefault, Main, ScreenreaderTitle } from '../..'
import MenuContent from './MenuContent'
import MenuHeader from './MenuHeader'
import MenuMobileMenu from './MenuMobileMenu'

export const MenuContext = createContext(null)

const Menu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
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
  const isLoading = loading === 'pending'
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const groupOrderClosed = useSelector(selectGroupOrderClosed)
  const { cartGuest } = useSelector(selectGroupOrder)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { entities } = useSelector(selectDeals)
  const deals = has_deals && entities.length ? entities : null
  const validDeals = useMemo(
    () => makeValidDeals(deals, orderType, serviceType, revenueCenterId),
    [deals, orderType, serviceType, revenueCenterId]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!revenueCenterId) {
      return history.push('/locations')
    } else if (groupOrderClosed) {
      return history.push('/review')
    } else {
      const requested = orderType === 'CATERING' ? requestedAt : null
      dispatch(fetchAllergens())
      dispatch(fetchRevenueCenter(revenueCenterId, requested))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
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

  useEffect(() => {
    if (has_deals && !isLoading && !cartGuest) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, isLoading, dispatch, cartGuest])

  const changeRevenueCenter = () => {
    dispatch(resetRevenueCenter())
  }

  return (
    <>
      <Helmet>
        <title>Menu | {siteTitle}</title>
      </Helmet>
      <Content>
        {/* <MenuHeader showMenu={showMenu} setShowMenu={setShowMenu} /> */}
        <HeaderDefault />
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
              deals: validDeals,
            }}
          >
            {isMobile && (
              <MenuMobileMenu
                order={order}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            )}
            <ScreenreaderTitle>Menu</ScreenreaderTitle>
            <MenuContent />
          </MenuContext.Provider>
        </Main>
      </Content>
    </>
  )
}

Menu.displayName = 'Menu'
export default Menu
