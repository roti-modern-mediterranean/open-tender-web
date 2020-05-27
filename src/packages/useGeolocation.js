import { useState, useEffect } from 'react'

const geoOptions = {
  maximumAge: 60 * 60 * 1000,
  timeout: 5 * 1000,
}

const useGeolocation = () => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  const onSuccess = (position) => {
    // console.log('location found!', position)
    const { coords } = position
    const latLng = { lat: coords.latitude, lng: coords.longitude }
    setPosition(latLng)
  }

  const onError = (error) => {
    setError(error.message)
  }

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return
    }
    // console.log('looking up location...')
    geo.getCurrentPosition(onSuccess, onError, geoOptions)
  }, [])

  return { geoLatLng: position, geoError: error }
}

export default useGeolocation
