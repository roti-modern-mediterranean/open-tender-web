import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  resetRevenueCenters,
  resetOrderType,
  selectGroupOrder,
  resetGroupOrder,
} from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import {
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectSettings,
} from '../../../slices'
import {
  Background,
  Content,
  HeaderButton,
  HeaderButtonMobile,
  HeaderLogo,
  HeaderMobile,
  Main,
  PageTitle,
  Welcome,
} from '../..'
// import OrderType from './OrderType'
import { Menu } from 'react-feather'
import HomeButtons from './HomeButtons'
import { ButtonAccount } from '../../buttons'

const makeContent = (content) => {
  if (!content || !content.length || !content[0].length) return null
  return (
    <>
      {content.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
    </>
  )
}

const Home = () => {
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()
  // const config = useSelector(selectConfig)
  const { home: homeConfig } = useSelector(selectConfig)
  const { background, title, subtitle, content } = homeConfig
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(setGeoLoading())
    dispatch(resetRevenueCenters())
    dispatch(resetOrderType())
  }, [dispatch])

  useEffect(() => {
    if (cartGuestId) dispatch(resetGroupOrder())
  }, [dispatch, cartGuestId])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  console.log(content)

  return (
    <>
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="transparent"
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={
            isBrowser ? (
              <ButtonAccount classes="ot-btn--header" />
            ) : (
              <HeaderButtonMobile
                color="light"
                onClick={() => console.log('clicked')}
              >
                <Menu size={20} />
              </HeaderButtonMobile>
            )
          }
        />
        <Main padding="0" imageUrl={background}>
          {hasOrderTypes ? (
            <Welcome
              // imageUrl={background}
              header={
                <>
                  <h1>{title}</h1>
                  <p>{subtitle}</p>
                </>
              }
              content={makeContent(content)}
            >
              <HomeButtons />
            </Welcome>
          ) : (
            <Welcome
              header={
                <>
                  <h1>Online ordering is currently closed</h1>
                  <p>
                    We're very sorry for the inconvenience. Please try back at a
                    later time.
                  </p>
                </>
              }
            />
          )}
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home
