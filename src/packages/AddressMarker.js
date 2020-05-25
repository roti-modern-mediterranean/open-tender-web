/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const eventMapping = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
}

const AddressMarker = ({
  maps,
  map,
  title,
  position,
  icon,
  size = { width: 30, height: 40 },
  events,
}) => {
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    if (marker) {
      // console.log('position updated', title, marker)
      marker.setPosition(position)
    }
  }, [position.lat, position.lng])

  useEffect(() => {
    if (marker) {
      // console.log('icon updated', title, marker)
      marker.setIcon({
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
      })
    }
  }, [icon])

  useEffect(() => {
    const newMarker = new maps.Marker({
      position,
      map,
      title,
      animation: maps.Animation.DROP,
      icon: {
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
      },
    })
    if (events) {
      Object.keys(events).forEach((eventName) =>
        newMarker.addListener(eventMapping[eventName], events[eventName])
      )
    }
    // console.log('new marker created', title, newMarker)
    setMarker(newMarker)
    return () => {
      // console.log('marker removed', title, marker)
      marker && marker.setMap(null)
      setMarker(null)
    }
  }, [])

  return null
}

AddressMarker.displayName = 'GoogleMapsMarker'
export default AddressMarker
