import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { isBrowser, isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  selectOrder,
  setOrderServiceType,
  selectRevenueCenters,
} from '@open-tender/redux'
import { makeOrderTypeFromParam } from '@open-tender/js'
import { GoogleMap, GoogleMapsMarker } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import {
  selectBrand,
  selectSettings,
  selectGeoLatLng,
  selectConfig,
} from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Header, Main, ScreenreaderTitle } from '../..'
import userMarker from '../../../assets/userMarker.svg'
import mapMarkerRed from '../../../assets/mapMarkerRed.svg'
import mapMarkerDarkRed from '../../../assets/mapMarkerDarkRed.svg'

import { StartOver } from '../../buttons'
import RevenueCenterMap from './RevenueCenterMap'
import MapsAutocomplete from './MapsAutocomplete'

const iconSizes = {
  small: { width: 40, height: 40 },
  medium: { width: 66, height: 66 },
  large: { width: 100, height: 100 },
}

const makeIconSpecs = (isBrowser, isActive) => {
  const [active, other] = isBrowser
    ? [mapMarkerDarkRed, mapMarkerRed]
    : [mapMarkerRed, mapMarkerDarkRed]
  const url = isActive ? active : other
  const [activeSize, otherSize] = isBrowser
    ? [iconSizes.large, iconSizes.medium]
    : [iconSizes.medium, iconSizes.small]
  const size = isActive ? activeSize : otherSize
  return { url, size }
}

const RevenueCenters = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [activeMarker, setActiveMarker] = useState(null)
  const { title: siteTitle } = useSelector(selectBrand)
  const { revenueCenters: config } = useSelector(selectConfig)
  const { orderType, serviceType, address } = useSelector(selectOrder)
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles, icons } = googleMaps
  const geoLatLng = useSelector(selectGeoLatLng)
  const initialCenter = address
    ? { lat: address.lat, lng: address.lng }
    : geoLatLng || defaultCenter
  const [center, setCenter] = useState(initialCenter)
  const { revenueCenters } = useSelector(selectRevenueCenters)
  const hasTypes = orderType && serviceType
  const query = new URLSearchParams(useLocation().search)
  const param = query.get('type')
  const { windowRef } = useContext(AppContext)
  const navTitle =
    config.title && config.title.length < 20 ? config.title : 'Find a Store'

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    let paramOrderType = null
    if (param) {
      const [orderType, serviceType, isOutpost] = makeOrderTypeFromParam(param)
      if (paramOrderType) {
        dispatch(setOrderServiceType(orderType, serviceType, isOutpost))
        if (paramOrderType[0] === 'CATERING') history.push('/catering')
      }
    }
    if (!hasTypes && !paramOrderType) history.push('/')
  }, [hasTypes, param, dispatch, history])

  const setActive = (revenueCenter) => {
    windowRef.current.scrollTop = 0
    if (revenueCenter) {
      const { revenue_center_id, address } = revenueCenter
      setActiveMarker(revenue_center_id)
      setCenter({ lat: address.lat, lng: address.lng })
    } else {
      setActiveMarker(null)
      const newCenter = address
        ? { lat: address.lat, lng: address.lng }
        : geoLatLng || defaultCenter
      setCenter(newCenter)
    }
  }

  return (
    <>
      <Helmet>
        <title>Locations | {siteTitle}</title>
      </Helmet>
      <Content hasFooter={false}>
        <Header
          bgColor="transparent"
          borderColor="transparent"
          style={{ boxShadow: 'none' }}
          title={isMobile ? navTitle : null}
          left={<StartOver />}
          right={null}
        />
        <Main style={{ paddingTop: '0' }}>
          <ScreenreaderTitle>Locations</ScreenreaderTitle>
          {apiKey && (
            <GoogleMap
              apiKey={apiKey}
              zoom={zoom}
              styles={styles}
              center={center}
              loader={<ClipLoader size={30} loading={true} />}
              renderMap={(props) => <RevenueCenterMap {...props} />}
              // events={null}
            >
              <MapsAutocomplete
                setCenter={setCenter}
                center={center}
                setActive={setActive}
                activeMarker={activeMarker}
              />
              {revenueCenters.map((i) => {
                const isActive = i.revenue_center_id === activeMarker
                const icon = makeIconSpecs(isBrowser, isActive)
                return (
                  <GoogleMapsMarker
                    key={i.revenue_center_id}
                    title={i.name}
                    position={{
                      lat: i.address.lat,
                      lng: i.address.lng,
                    }}
                    icon={icon.url}
                    size={icon.size}
                    anchor={null}
                    events={{ onClick: () => setActive(i) }}
                  />
                )
              })}
              {address && (
                <GoogleMapsMarker
                  title="Your Location"
                  position={{
                    lat: center.lat,
                    lng: center.lng,
                  }}
                  // icon={icons.user.url}
                  icon={userMarker}
                  size={icons.user.size}
                  anchor={icons.user.anchor}
                  drop={null}
                />
              )}
            </GoogleMap>
          )}
        </Main>
      </Content>
    </>
  )
}

RevenueCenters.displayName = 'RevenueCenters'
export default RevenueCenters
