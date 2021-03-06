import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'
import { selectAnnouncements, fetchAnnouncementPage } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import { Account, Home, Logout } from '../../buttons'
import {
  Background,
  Content,
  HeaderMobile,
  Main,
  PageHeader,
  PageHero,
  PageView,
} from '../..'
import OrderTypes from './OrderTypes'

const OrderType = () => {
  const dispatch = useDispatch()
  const announcements = useSelector(selectAnnouncements)
  const { auth } = useSelector(selectCustomer)
  const { orderType } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, showHero } = orderType
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('ORDER_TYPE'))
  }, [dispatch])

  return (
    <>
      <Background announcements={announcements} imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="primary"
          borderColor="primary"
          maxWidth="76.8rem"
          title={!isBrowser ? 'Order Type' : null}
          left={<Home />}
          right={auth ? <Logout /> : <Account />}
        />
        <Main>
          <PageView>
            {!isBrowser && (
              <PageHero
                announcements={announcements}
                imageUrl={mobile}
                showHero={showHero}
              />
            )}
            <PageHeader title={title} subtitle={subtitle} />
            <OrderTypes />
          </PageView>
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
