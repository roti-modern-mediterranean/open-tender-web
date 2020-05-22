/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import {
  Input,
  useGoogleMapsAutocomplete,
  useGoogleMapsPlace,
  makeAddress,
} from './index'

const keys = {
  enter: 13,
  up: 38,
  down: 40,
}

const GoogleMapsAutocomplete = ({ maps, map, setAddress, setCenter }) => {
  const [input, setInput] = useState('')
  const [activeIndex, setActiveIndex] = useState(null)
  const [placeId, setPlaceId] = useState(null)
  const predictions = useGoogleMapsAutocomplete(maps, input)
  const place = useGoogleMapsPlace(maps, map, placeId)
  // console.log(predictions.length)
  // console.log(place)

  const choosePlace = (evt, placeId, description) => {
    evt.preventDefault()
    setPlaceId(placeId)
    setInput(description)
    setActiveIndex(null)
    evt.target.blur()
  }

  const handleKeyPress = useCallback(
    (evt) => {
      const handleEnter = (evt) => {
        if (!predictions.length || activeIndex === null) return
        const prediction = predictions.find((i, index) => index === activeIndex)
        if (prediction) {
          const { place_id, description } = prediction
          choosePlace(evt, place_id, description)
        }
      }

      const handleMove = (increment) => {
        evt.preventDefault()
        if (!predictions.length) setActiveIndex(null)
        let val = activeIndex === null ? 0 : activeIndex + increment
        const max = predictions.length - 1
        val = val < 0 ? 0 : val > max ? max : val
        setActiveIndex(val)
      }

      switch (evt.keyCode) {
        case keys.enter:
          return handleEnter(evt)
        case keys.up:
          return handleMove(-1)
        case keys.down:
          return handleMove(1)
        default:
          break
      }
    },
    [predictions, activeIndex]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false)
    return () => document.removeEventListener('keydown', handleKeyPress, false)
  }, [handleKeyPress])

  useEffect(() => {
    // console.log(place)
    // console.log(JSON.stringify(place, null, 2))
    if (place) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      if (lat && lng) setCenter({ lat, lng })
    }
    const address = place ? makeAddress(place) : null
    // console.log(address)
    setAddress(address)
  }, [place])

  return (
    <div className="autocomplete">
      <Input
        label="Please enter your address"
        name="address"
        type="text"
        value={input}
        placeholder="enter your address"
        onChange={(evt) => setInput(evt.target.value)}
        showLabel={false}
        classes="autocomplete__input"
      >
        <div className="autocomplete__predictions bg-color border-radius border-color">
          <ul>
            {predictions.map((i, index) => {
              const active = activeIndex === index ? 'bg-secondary-color' : ''
              let classes =
                'autocomplete__prediction border-color font-size-small '
              classes += active
              return (
                <li key={i.place_id} className={classes}>
                  <button
                    onClick={(evt) =>
                      choosePlace(evt, i.place_id, i.description)
                    }
                  >
                    {i.description}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </Input>
    </div>
  )
}

GoogleMapsAutocomplete.displayName = 'MapCard'
GoogleMapsAutocomplete.propTypes = {
  maps: propTypes.object,
  setAddress: propTypes.func,
}
export default GoogleMapsAutocomplete
