import { useEffect, useState } from 'react'

const eventMapping = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
}

const useGoogleMapsMarker = ({
  maps,
  map,
  events,
  position,
  title,
  icon,
  size,
}) => {
  const [marker, setMarker] = useState()
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
    setMarker(marker)
  }, [])

  return marker
}

export default useGoogleMapsMarker
