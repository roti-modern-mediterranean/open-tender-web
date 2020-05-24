import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../../slices/configSlice'
import { selectOrder } from '../../slices/orderSlice'
import { selectLocations, fetchLocations } from '../../slices/locationsSlice'
import { GoogleMap, GoogleMapsMarker, AddressMarker } from '../../packages'
import MapCard from '../MapCard'

const defaultCenter = { lat: 40.7572285, lng: -73.9729147 }

const MapPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [activeMarker, setActiveMarker] = useState(null)
  const { orderType, serviceType, address } = useSelector(selectOrder)
  const initialCenter = address
    ? { lat: address.lat, lng: address.lng }
    : defaultCenter
  const [center, setCenter] = useState(initialCenter)
  const { googleMaps: mapConfig } = useSelector(selectConfig)
  const { apiKey, zoom, styles, icons, marker_size } = mapConfig

  const { locations } = useSelector(selectLocations)
  const hasTypes = orderType && serviceType

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  useEffect(() => {
    orderType && dispatch(fetchLocations(orderType))
  }, [orderType, dispatch])

  return (
    <div className="content">
      <GoogleMap
        apiKey={apiKey}
        zoom={zoom}
        styles={styles}
        center={center}
        // events={null}
      >
        <MapCard setCenter={setCenter} center={center} />
        {locations.map((i) => {
          const isActive = i.location_id === activeMarker
          const icon = isActive ? icons.active : icons.inactive
          return (
            <GoogleMapsMarker
              key={i.location_id}
              title={i.name}
              position={{ lat: i.address.lat, lng: i.address.lng }}
              icon={icon}
              size={marker_size}
              // active={isActive}
              events={{
                onClick: () => setActiveMarker(i.location_id),
              }}
            />
          )
        })}
        {address && (
          <AddressMarker
            position={{ lat: center.lat, lng: center.lng }}
            icon={icons.user}
            size={marker_size}
          />
        )}
      </GoogleMap>
    </div>
  )
}

MapPage.displayName = 'MapPage'
export default MapPage
