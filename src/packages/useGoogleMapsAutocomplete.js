/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import debounce from 'lodash/debounce'

const useGoogleMapsAutocomplete = ({ apiKey, input }) => {
  const [predictions, setPredictions] = useState([])

  const autocomplete = useRef()

  if (!autocomplete.current) {
    GoogleMapsApiLoader({ libraries: ['places'], apiKey }).then((google) => {
      autocomplete.current = new google.maps.places.AutocompleteService()
    })
  }

  const getPlacePredictions = (input) => {
    console.log(autocomplete.current)
    if (autocomplete.current) {
      autocomplete.current.getPlacePredictions({ input }, (predictions) => {
        if (predictions) {
          setPredictions(
            predictions.map((prediction) => prediction.description)
          )
        }
      })
    }
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 500),
    []
  )

  useEffect(() => {
    debouncedGetPlacePredictions(input)
  }, [input])

  return predictions
}

export default useGoogleMapsAutocomplete
