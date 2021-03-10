import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'
import Helmet from 'react-helmet'
// import { selectAnnouncements, fetchAnnouncementPage } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Account, Home, Logout } from '../../buttons'
import { Content, HeaderMobile, Main, PageContainer, PageTitle } from '../..'
import OrderTypes from './OrderTypes'

const OrderType = () => {
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { orderType } = useSelector(selectConfig)
  const { title, subtitle } = orderType
  const { windowRef } = useContext(AppContext)
  // const announcements = useSelector(selectAnnouncements)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  // useEffect(() => {
  //   dispatch(fetchAnnouncementPage('ORDER_TYPE'))
  // }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Account Settings | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderMobile
          title={!isBrowser ? 'Order Type' : null}
          left={<Home />}
          right={auth ? <Logout /> : <Account />}
        />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle title={title} subtitle={subtitle} />
            <OrderTypes />
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
