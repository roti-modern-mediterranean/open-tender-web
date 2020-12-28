import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  selectOrder,
  setOrderServiceType,
  selectRevenueCenters,
} from '@open-tender/redux'
import { makeOrderTypeFromParam } from '@open-tender/js'
import { GoogleMap, GoogleMapsMarker } from '@open-tender/components'

import { selectBrand, selectSettings, selectGeoLatLng } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, HeaderMobile, Main } from '../..'
import RevenueCentersSelect from './RevenueCentersSelect'
import { Account, StartOver } from '../../buttons'

const RevenueCenters = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [activeMarker, setActiveMarker] = useState(null)
  const { title: siteTitle } = useSelector(selectBrand)
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

  useEffect(() => {
    windowRef.current.scroll(0, 0)
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

  return (
    <>
      <Helmet>
        <title>Locations | {siteTitle}</title>
      </Helmet>
      <Content maxWidth="76.8rem">
        <HeaderMobile
          maxWidth="76.8rem"
          left={<StartOver />}
          right={<Account />}
        />
        <Main>
          {apiKey && (
            <GoogleMap
              apiKey={apiKey}
              zoom={zoom}
              styles={styles}
              center={center}
              loader={<ClipLoader size={30} loading={true} />}
              // events={null}
            >
              <RevenueCentersSelect setCenter={setCenter} center={center} />
              {revenueCenters.map((i) => {
                const isActive = i.revenue_center_id === activeMarker
                const icon = isActive ? icons.locationSelected : icons.location
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
                    anchor={icon.anchor}
                    events={{
                      onClick: () => setActiveMarker(i.revenue_center_id),
                    }}
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
                  icon={icons.user.url}
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
