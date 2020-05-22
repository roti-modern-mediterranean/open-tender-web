import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectGoogleMapsConfig } from '../../slices/configSlice'
import { GoogleMap, Input } from '../../packages'

const MapPage = () => {
  const [input, setInput] = useState('')
  // const [bound, setBound] = useState({})
  const config = useSelector(selectGoogleMapsConfig)
  return (
    <div className="content">
      <GoogleMap
        apiKey={config.apiKey}
        zoom={config.zoom}
        styles={config.styles}
        center={{ lat: 40.7572285, lng: -73.9729147 }}
        // events={{ onBoundsChangerd: (arg) => setBound(arg) }}
      />
      <div className="card overlay border-radius slide-up ot-box-shadow">
        <div className="card__header">
          <h1 className="ot-font-size-h3">Find the closest location</h1>
          <p>
            Please start typing your address below and select the best option.
          </p>
        </div>
        <div className="card__content">
          <Input
            label="Please enter your address"
            name="address"
            type="text"
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
            showLabel={false}
          />
          {/* <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  )
}

MapPage.displayName = 'MapPage'
export default MapPage
