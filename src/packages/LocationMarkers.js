/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const makeMarkers = (locations, maps, map, icon, size) => {
  if (!locations || !locations.length) return []
  const markers = locations.map((i) => {
    const newMarker = {
      position: { lat: i.address.lat, lng: i.address.lng },
      map,
      title: i.name,
      animation: maps.Animation.DROP,
      icon: {
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
      },
    }
    return newMarker
  })
  return markers
}

// const makeMarkers = (locations, maps, map, icon, size) => {
//   if (!locations || !locations.length) return []
//   const markers = locations.map((i) => {
//     const newMarker = new maps.Marker({
//       position: { lat: i.address.lat, lng: i.address.lng },
//       map,
//       title: i.name,
//       // animation: maps.Animation.DROP,
//       icon: {
//         url: icon,
//         scaledSize: new maps.Size(size.width, size.height),
//       },
//     })
//     return newMarker
//   })
//   return markers
// }

const LocationMarkers = ({
  maps,
  map,
  locations,
  icon,
  size = { width: 30, height: 40 },
}) => {
  const [markers, setMarkers] = useState([])
  const [googleMarkers, setGoogleMarkers] = useState([])

  // useEffect(() => {
  //   markers.map((marker) => marker.setMap(null))
  //   const newMarkers = makeMarkers(locations, maps, map, icon, size)
  //   setMarkers(newMarkers)
  // }, [locations])

  useEffect(() => {
    const existing = markers.map((i) => i.name)
    const updated = makeMarkers(locations, maps, map, icon, size)
    const added = updated.filter((i) => !existing.includes(i.name))
    // const removed = updated.filter((i) => !existing.includes(i.name))
    console.log('newMarkers', added)
    setMarkers(added)
    const newGoogleMarkers = added.map((i) => new maps.Marker(i))
    console.log('newGoogleMarkers', newGoogleMarkers)
    setGoogleMarkers(newGoogleMarkers)
    return () => {
      googleMarkers.map((marker) => marker.setMap(null))
      setGoogleMarkers([])
      setMarkers([])
    }
  }, [locations])

  return null
}

LocationMarkers.displayName = 'GoogleMapsMarker'
export default LocationMarkers
