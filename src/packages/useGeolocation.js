import { useState, useEffect } from 'react'

const useGeolocation = () => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  const onSuccess = ({ coords }) => {
    const position = { lat: coords.latitude, lng: coords.longitude }
    setPosition(position)
    // setGeoLatLng(position)
  }

  const onError = (error) => {
    setError(error.message)
    // setGeoError(error.message)
  }

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return
    }
    geo.getCurrentPosition(onSuccess, onError)
  }, [])

  return { geoLatLng: position, geoError: error }
}

export default useGeolocation
