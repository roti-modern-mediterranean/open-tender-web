import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input, useGoogleMapsAutocomplete } from '../packages'
import { selectConfig } from '../slices/configSlice'

const MapCard = ({ locations, maps }) => {
  // const autocomplete = new maps.places.AutocompleteService()
  const [input, setInput] = useState('')
  const predictions = useGoogleMapsAutocomplete(maps, input)
  const { map: mapConfig } = useSelector(selectConfig)
  const { title, subtitle, content } = mapConfig

  return (
    <div className="card card--map overlay border-radius slide-up ot-box-shadow">
      <div className="card__header">
        <p className="preface secondary-color">{subtitle}</p>
        <h1 className="ot-font-size-h3">{title}</h1>
        <p className="secondary-color">{content}</p>
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
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>{prediction.description}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

MapCard.displayName = 'MapCard'
export default MapCard
