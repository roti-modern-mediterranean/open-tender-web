/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const AddressMarker = ({
  maps,
  map,
  position,
  icon,
  size = { width: 30, height: 40 },
}) => {
  const [marker, setMarker] = useState(null)
  // const [currentPosition, setCurrentPosition] = useState(null)

  useEffect(() => {
    if (marker) {
      marker.setPosition(position)
    }
  }, [position])

  useEffect(() => {
    const newMarker = new maps.Marker({
      position,
      map,
      animation: maps.Animation.DROP,
      icon: {
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
      },
    })
    setMarker(newMarker)
    return () => {
      marker && marker.setMap(null)
      setMarker(null)
    }
  }, [])

  return null
}

AddressMarker.displayName = 'GoogleMapsMarker'
export default AddressMarker
