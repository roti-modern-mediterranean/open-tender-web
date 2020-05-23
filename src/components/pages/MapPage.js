import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectGoogleMapsConfig } from '../../slices/configSlice'
import { selectOrder } from '../../slices/orderSlice'
import { GoogleMap } from '../../packages'
import MapCard from '../MapCard'

const MapPage = () => {
  // const [bound, setBound] = useState({})
  const [center, setCenter] = useState({ lat: 40.7572285, lng: -73.9729147 })
  const history = useHistory()
  const config = useSelector(selectGoogleMapsConfig)
  const { orderType, serviceType } = useSelector(selectOrder)
  const hasTypes = orderType && serviceType

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  return (
    <div className="content">
      <GoogleMap
        apiKey={config.apiKey}
        zoom={config.zoom}
        styles={config.styles}
        center={center}
        // events={{ onBoundsChangerd: (arg) => setBound(arg) }}
      >
        <MapCard setCenter={setCenter} center={center} />
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
