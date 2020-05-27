import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../../slices/configSlice'
import { selectOrder } from '../../slices/orderSlice'
import { selectGeoLatLng } from '../../slices/geolocationSlice'
import { selectLocations } from '../../slices/locationsSlice'
import { GoogleMap, GoogleMapsMarker } from '../../packages'
import SelectLocation from '../SelectLocation'

const LocationsPage = () => {
  const history = useHistory()
  const [activeMarker, setActiveMarker] = useState(null)
  const { orderType, serviceType, address } = useSelector(selectOrder)
  const { googleMaps: mapsConfig } = useSelector(selectConfig)
  const { apiKey, defaultCenter, zoom, styles, icons } = mapsConfig
  const geoLatLng = useSelector(selectGeoLatLng)
  const initialCenter = address
    ? { lat: address.lat, lng: address.lng }
    : geoLatLng || defaultCenter
  const [center, setCenter] = useState(initialCenter)
  const { locations } = useSelector(selectLocations)
  const hasTypes = orderType && serviceType

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  return (
    <div className="content">
      <GoogleMap
        apiKey={apiKey}
        zoom={zoom}
        styles={styles}
        center={center}
        // events={null}
      >
        <SelectLocation setCenter={setCenter} center={center} />
        {locations.map((i) => {
          const isActive = i.location_id === activeMarker
          const icon = isActive ? icons.active : icons.inactive
          return (
            <GoogleMapsMarker
              key={i.location_id}
              title={i.name}
              position={{
                lat: i.address.lat,
                lng: i.address.lng,
              }}
              icon={icon.url}
              size={icon.size}
              anchor={icon.anchor}
              events={{
                onClick: () => setActiveMarker(i.location_id),
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
          />
        )}
      </GoogleMap>
    </div>
  )
}

LocationsPage.displayName = 'LocationsPage'
export default LocationsPage
