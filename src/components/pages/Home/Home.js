import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectAnnouncements,
  fetchAnnouncementPage,
  selectCustomer,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, HeaderDefault, Main, PageHero, PageView } from '../..'
import HomeMenu from '../Home/HomeMenu'
import HomeJourneys from '../Home/HomeJourneys'
import HomeRecentOrders from './HomeRecentOrders'
import HomeLifestyle from './HomeLifestyle'

const Home = () => {
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const announcements = useSelector(selectAnnouncements)
  const { auth } = useSelector(selectCustomer)
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, showHero } = home
  const page = auth ? 'ACCOUNT' : 'HOME'

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage(page))
  }, [dispatch, page])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageView>
            <PageHero
              announcements={announcements}
              imageUrl={isBrowser ? background : mobile}
              showHero={showHero}
              maxHeight="36rem"
            />
            {auth && <HomeRecentOrders style={{ marginBottom: '0' }} />}
            <HomeMenu />
            <HomeJourneys />
            <HomeLifestyle />
          </PageView>
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home
