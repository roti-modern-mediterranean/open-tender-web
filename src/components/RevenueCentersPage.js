import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { makeOrderTypeFromParam } from 'open-tender-js'
import { GoogleMap, GoogleMapsMarker } from 'open-tender'
import {
  selectOrder,
  setOrderServiceType,
  selectRevenueCenters,
} from 'open-tender-redux'
import { selectConfig } from '../slices/configSlice'
import { selectGeoLatLng } from '../slices/geolocationSlice'
import RevenueCentersSelect from './RevenueCentersSelect'
import ClipLoader from 'react-spinners/ClipLoader'

const RevenueCentersPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [activeMarker, setActiveMarker] = useState(null)
  const { orderType, serviceType, address } = useSelector(selectOrder)
  const { googleMaps: mapsConfig } = useSelector(selectConfig)
  const { apiKey, defaultCenter, zoom, styles, icons } = mapsConfig
  const geoLatLng = useSelector(selectGeoLatLng)
  const initialCenter = address
    ? { lat: address.lat, lng: address.lng }
    : geoLatLng || defaultCenter
  const [center, setCenter] = useState(initialCenter)
  const { revenueCenters } = useSelector(selectRevenueCenters)
  const hasTypes = orderType && serviceType
  const query = new URLSearchParams(useLocation().search)
  const param = query.get('type')

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    let paramOrderType = null
    if (param) {
      paramOrderType = makeOrderTypeFromParam(param)
      if (paramOrderType) {
        dispatch(setOrderServiceType(paramOrderType))
        if (paramOrderType[0] === 'CATERING') history.push('/catering')
      }
    }
    if (!hasTypes && !paramOrderType) history.push('/')
  }, [hasTypes, param, dispatch, history])

  return (
    <div className="content">
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
            const icon = isActive ? icons.active : icons.inactive
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
    </div>
  )
}

RevenueCentersPage.displayName = 'RevenueCentersPage'
export default RevenueCentersPage
