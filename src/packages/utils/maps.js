import inside from 'point-in-polygon'

// seee example Google Maps Place at bottom of file
const makeComponents = (components) => {
  return components.reduce((obj, i) => {
    return {
      ...obj,
      [i.types[0]]: { long_name: i.long_name, short_name: i.short_name },
    }
  }, {})
}

export const makeAddress = (place) => {
  const { address_components, formatted_address, geometry } = place
  const components = makeComponents(address_components)
  const {
    street_number,
    route,
    locality: city,
    administrative_area_level_1: state,
    postal_code: postalCode,
  } = components
  const streetNumber = street_number ? street_number.short_name : ''
  const street = route ? route.long_name : ''
  return {
    street: `${streetNumber} ${street}`.trim(),
    city: city ? city.long_name : '',
    state: state ? state.short_name : '',
    postal_code: postalCode ? postalCode.short_name : '',
    lat: geometry.location.lat() || null,
    lng: geometry.location.lng() || null,
    formatted_address,
  }
}

export const RADIUS_MILES = 3959 // radius of the earth in miles
export const RADIUS_KM = 6371 // radius of the earth in kilometers

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
export const getDistance = (pointA, pointB, inMiles = true) => {
  const { lat: lat1, lng: lng1 } = pointA
  const { lat: lat2, lng: lng2 } = pointB
  const R = inMiles ? RADIUS_MILES : RADIUS_KM
  const dLat = deg2rad(lat2 - lat1) // see deg2rad below
  const dLng = deg2rad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

export const inZone = (address, polygon) => {
  const point = [address.lat, address.lng]
  return inside(point, polygon)
}

export const addDistance = (revenueCenters, address) => {
  if (!address) return revenueCenters
  const withDistance = revenueCenters.map((i) => {
    const latLng = i.address.lat
      ? { lat: i.address.lat, lng: i.address.lng }
      : null
    i.distance = latLng ? getDistance(address, latLng) : 1000
    const { coordinates, priority } = i.delivery_zone
    i.inZone = coordinates ? inZone(address, coordinates) : false
    i.priority = priority
    return i
  })
  return withDistance
}

export const sortRevenueCenters = (revenueCenters, isDelivery = false) => {
  if (!isDelivery) {
    return [...revenueCenters].sort((a, b) => a.distance - b.distance)
  }
  const inZoneWithPriority = revenueCenters
    .filter((i) => i.inZone && i.priority)
    .sort((a, b) => a.priority - b.priority)
  const inZoneWithoutPriority = revenueCenters
    .filter((i) => i.inZone && !i.priority)
    .sort((a, b) => a.distance - b.distance)
  const outOfZone = revenueCenters
    .filter((i) => !i.inZone)
    .sort((a, b) => a.distance - b.distance)
  return [...inZoneWithPriority, ...inZoneWithoutPriority, ...outOfZone]
}

const makeMapStyles = ({
  labelColor,
  roadColor,
  featureColor,
  waterColor,
  backgroundColor,
}) => [
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'off' }],
    // stylers: [{ color: labelColor }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }, { color: roadColor }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: labelColor }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: featureColor }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: waterColor }],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: backgroundColor }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: backgroundColor }],
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
]

export default makeMapStyles

/* example Google Maps Place

{
  "address_components": [
    {
      "long_name": "150",
      "short_name": "150",
      "types": [
        "street_number"
      ]
    },
    {
      "long_name": "East Huron Street",
      "short_name": "E Huron St",
      "types": [
        "route"
      ]
    },
    {
      "long_name": "Streeterville",
      "short_name": "Streeterville",
      "types": [
        "neighborhood",
        "political"
      ]
    },
    {
      "long_name": "Chicago",
      "short_name": "Chicago",
      "types": [
        "locality",
        "political"
      ]
    },
    {
      "long_name": "Cook County",
      "short_name": "Cook County",
      "types": [
        "administrative_area_level_2",
        "political"
      ]
    },
    {
      "long_name": "Illinois",
      "short_name": "IL",
      "types": [
        "administrative_area_level_1",
        "political"
      ]
    },
    {
      "long_name": "United States",
      "short_name": "US",
      "types": [
        "country",
        "political"
      ]
    },
    {
      "long_name": "60611",
      "short_name": "60611",
      "types": [
        "postal_code"
      ]
    }
  ],
  "formatted_address": "150 E Huron St, Chicago, IL 60611, USA",
  "geometry": {
    "location": {
      "lat": 41.8950882,
      "lng": -87.62325709999999
    },
    "viewport": {
      "south": 41.8936716697085,
      "west": -87.62463608029151,
      "north": 41.8963696302915,
      "east": -87.62193811970849
    }
  },
  "place_id": "ChIJK3otrVTTD4gRNsbgQbBVYBw",
  "html_attributions": []
}

*/
