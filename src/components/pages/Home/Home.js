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
  HeaderLogo,
  HeaderMobile,
  Main,
  Welcome,
} from '../..'
import { Account } from '../../buttons'
import HomeButtons from './HomeButtons'

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

  return (
    <>
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={<Account color="light" />}
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
