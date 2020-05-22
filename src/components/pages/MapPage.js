import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectGoogleMapsConfig } from '../../slices/configSlice'
import { fetchLocations, selectLocations } from '../../slices/locationsSlice'
import { selectOrder } from '../../slices/orderSlice'
import { GoogleMap } from '../../packages'
import MapCard from '../MapCard'

const MapPage = () => {
  // const [bound, setBound] = useState({})
  const [center, setCenter] = useState({ lat: 40.7572285, lng: -73.9729147 })
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectGoogleMapsConfig)
  const locations = useSelector(selectLocations)
  const { orderType, serviceType } = useSelector(selectOrder)
  const hasTypes = orderType && serviceType

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  useEffect(() => {
    if (orderType) dispatch(fetchLocations(orderType))
  }, [orderType, dispatch])

  return (
    <div className="content">
      <GoogleMap
        apiKey={config.apiKey}
        zoom={config.zoom}
        styles={config.styles}
        center={center}
        // events={{ onBoundsChangerd: (arg) => setBound(arg) }}
      >
        <MapCard locations={locations} setCenter={setCenter} />
        {/* {locations.map((m, index) => (
          <Marker
            key={m.id}
            // active={placeIndex === index}
            title={'marker id: ' + m.id}
            position={{ lat: m.lat, lng: m.lng }}
            events={{
              onClick: () => window.alert(`marker ${index} clicked`),
            }}
          />
        ))} */}
      </GoogleMap>
    </div>
  )
}

MapPage.displayName = 'MapPage'
export default MapPage
