/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
// import useGoogleMapsMarker from './useGoogleMapsMarker'

const eventMapping = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
}

const GoogleMapsMarker = ({
  maps,
  map,
  position,
  title,
  icon,
  size = { width: 30, height: 40 },
  // active = false,
  events,
}) => {
  useEffect(() => {
    const marker = new maps.Marker({
      position,
      map,
      title,
      icon: {
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
      },
    })
    Object.keys(events).forEach((eventName) =>
      marker.addListener(eventMapping[eventName], events[eventName])
    )
  }, [position])

  // const marker = useGoogleMapsMarker({
  //   maps,
  //   map,
  //   position,
  //   title,
  //   icon,
  //   size,
  //   events,
  // })

  // useEffect(() => {
  //   marker &&
  //     (active
  //       ? marker.setIcon(icon).setSize(size)
  //       : marker.setIcon(icon).setSize(size))
  // }, [active])

  return null
}

GoogleMapsMarker.displayName = 'GoogleMapsMarker'
export default GoogleMapsMarker
