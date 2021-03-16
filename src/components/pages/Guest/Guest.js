import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { selectAnnouncements, fetchAnnouncementPage } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Locations, NavMenu, OrderNow } from '../../buttons'
import {
  Content,
  Header,
  Logo,
  Main,
  PageContainer,
  PageHero,
  PageView,
} from '../..'
import HomeMenu from '../Home/HomeMenu'

const Guest = () => {
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const announcements = useSelector(selectAnnouncements)
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, content, title, subtitle, showHero } = home
  const hasContent = !!(content && content.length && content[0].length)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('HOME'))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <Header
          left={<NavMenu />}
          title={<Logo />}
          right={
            <>
              <Locations />
              <OrderNow />
            </>
          }
          bgColor={isBrowser ? 'dark' : 'primary'}
          borderColor={isBrowser ? 'dark' : 'primary'}
        />
        <Main>
          <PageView>
            <PageHero
              announcements={announcements}
              imageUrl={isBrowser ? background : mobile}
              showHero={showHero}
              maxHeight="36rem"
            />
            <HomeMenu />
          </PageView>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
