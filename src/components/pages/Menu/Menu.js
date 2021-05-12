import React, {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
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
  selectAnnouncementsPage,
  fetchAnnouncementPage,
  selectMenuSlug,
} from '@open-tender/redux'
import { makeValidDeals } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, HeaderDefault, Main, ScreenreaderTitle } from '../..'
import MenuContent from './MenuContent'
import { selectTopOffset, setTopOffset } from '../../../slices/miscSlice'
import MenuFooter from './MenuFooter'
import MenuCatering from './MenuCatering'
import MenuModal from './MenuModal'

export const MenuContext = createContext(null)
export const MenuActiveContext = createContext(null)

const Menu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(null)
  const { windowRef } = useContext(AppContext)
  const menuSlug = useSelector(selectMenuSlug)
  const topOffset = useSelector(selectTopOffset)
  const [init, setInit] = useState(true)
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { menu: menuConfig } = useSelector(selectConfig)
  const { loadingMessage } = menuConfig
  const announcements = useSelector(selectAnnouncementsPage('MENU'))
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
    if (init) {
      windowRef.current.scrollTop = topOffset || 0
      maybeRefreshVersion()
    }
  }, [windowRef, topOffset, init])

  useEffect(() => {
    if (!revenueCenterId) {
      return history.push('/locations')
    } else if (groupOrderClosed) {
      return history.push('/review')
    } else if (topOffset) {
      dispatch(setTopOffset(null))
      setInit(false)
    } else if (init) {
      dispatch(fetchAllergens())
      dispatch(fetchRevenueCenter(revenueCenterId))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      dispatch(fetchAnnouncementPage('MENU'))
    }
  }, [
    revenueCenterId,
    orderType,
    serviceType,
    requestedAt,
    dispatch,
    history,
    groupOrderClosed,
    topOffset,
    init,
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
        <HeaderDefault path={menuSlug} />
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
              announcements,
            }}
          >
            <MenuActiveContext.Provider
              value={{
                activeItem,
                setActiveItem,
              }}
            >
              <ScreenreaderTitle>Menu</ScreenreaderTitle>
              <MenuModal />
              {orderType === 'CATERING' ? <MenuCatering /> : <MenuContent />}
              <MenuFooter />
            </MenuActiveContext.Provider>
          </MenuContext.Provider>
        </Main>
      </Content>
    </>
  )
}

Menu.displayName = 'Menu'
export default Menu
