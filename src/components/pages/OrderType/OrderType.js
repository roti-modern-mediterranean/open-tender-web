import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import { Account, Home, Logout } from '../../buttons'
import {
  Background,
  Content,
  HeaderMobile,
  Hero,
  Main,
  PageHeader,
  PageHero,
  PageView,
  Slider,
} from '../..'
import OrderTypes from './OrderTypes'
import { makeSlides } from '../../HeroSlides'

const OrderType = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { background, mobile } = home
  const { windowRef } = useContext(AppContext)
  const slides = makeSlides([])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  return (
    <>
      {isBrowser && (
        <Background imageUrl={slides ? null : background}>
          {slides && <Slider slides={slides} />}
        </Background>
      )}
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
              <PageHero>
                {slides ? (
                  <Slider slides={slides} />
                ) : (
                  <Hero imageUrl={mobile}>&nbsp;</Hero>
                )}
              </PageHero>
            )}
            <PageHeader
              title="Select an order type"
              subtitle="Please choose an order type to get started"
            />
            <OrderTypes />
          </PageView>
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType