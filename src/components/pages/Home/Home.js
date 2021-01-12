import React, { useContext, useEffect } from 'react'
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
import { AppContext } from '../../../App'
import styled from '@emotion/styled'
import { maybeRefreshVersion } from '../../../app/version'

const HomeContent = styled('div')`
  padding: 0 2.5rem 2.5rem;
  line-height: ${(props) => props.theme.lineHeight};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2.5rem;
    color: ${(props) => props.theme.colors.light};
    background-color: rgba(0, 0, 0, 0.3);
    border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
  }

  p {
    margin: 0.5em 0;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const makeContent = (content) => {
  if (!content || !content.length || !content[0].length) return null
  return (
    <HomeContent>
      {content.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
    </HomeContent>
  )
}

const Home = () => {
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()
  // const config = useSelector(selectConfig)
  const { home: homeConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = homeConfig
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(setGeoLoading())
    dispatch(resetRevenueCenters())
    dispatch(resetOrderType())
  }, [windowRef, dispatch])

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
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={<Account color="light" />}
        />
        <Main padding="0" imageUrl={mobile || background}>
          {hasOrderTypes ? (
            <Welcome
              // imageUrl={background}
              header={
                <>
                  <h1>{title}</h1>
                  <p>{subtitle}</p>
                </>
              }
            >
              <HomeButtons content={makeContent(content)} />
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
