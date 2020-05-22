/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import makeMapStyles from './mapStyles'

// https://github.com/laurencedorman/google-maps-api-loader
// https://codesandbox.io/s/lx947qjv0z

const eventsMapping = {
  onCenterChanged: ['center_changed', (map) => map.getCenter()],
  onBoundsChangerd: ['bounds_changed', (map) => map.getBounds()],
}

const useGoogleMap = ({ apiKey, zoom, styles, center, events = {} }) => {
  const [mapState, setMapState] = useState({ loading: true })
  const mapRef = useRef()
  useEffect(() => {
    const mapStyles = makeMapStyles(styles)
    GoogleMapsApiLoader({ apiKey }).then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        zoom,
        center,
        styles: mapStyles,
        // scrollwheel: false,
        // draggableCursor: 'crosshair',
      })
      Object.keys(events).forEach((eventName) =>
        map.addListener(eventsMapping[eventName][0], () =>
          events[eventName](eventsMapping[eventName][1](map))
        )
      )

      setMapState({ maps: google.maps, map, loading: false })
    })
  }, [])
  return { mapRef, ...mapState }
}

export default useGoogleMap
