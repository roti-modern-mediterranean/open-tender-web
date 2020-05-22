/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

const useGoogleMapsAutocomplete = (maps, input) => {
  const [predictions, setPredictions] = useState([])

  const sessionToken = new maps.places.AutocompleteSessionToken()
  const autocomplete = new maps.places.AutocompleteService()

  const getPlacePredictions = (input) => {
    if (input.length) {
      autocomplete.getPlacePredictions(
        { input, sessionToken },
        (predictions) => {
          setPredictions(predictions)
        }
      )
    }
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 250),
    []
  )

  useEffect(() => {
    debouncedGetPlacePredictions(input)
  }, [input])

  return predictions
}

export default useGoogleMapsAutocomplete
