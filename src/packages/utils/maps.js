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
  // console.log(components)
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
  const [lat1, lng1] = pointA
  const [lat2, lng2] = pointB
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

// export const inZone = (point, polygon) => {
//   return inside(point, polygon)
// }

export const parseDeliveryZone = (delivery_zones) => {
  try {
    const { coordinates, priority } = delivery_zones[0].delivery_zone
    return [JSON.parse(coordinates), priority]
  } catch {
    return [null, 0]
  }
}

export const getLatLng = (address) => {
  let latLng
  try {
    latLng = [parseFloat(address.latitude), parseFloat(address.longitude)]
  } catch {
    latLng = null
  }
  return latLng
}

// export const sortRevenueCenters = (rcs, latLng) => {
//   const open = rcs.filter((i) => !i.closed).filter((i) => !i.store.is_master)
//   let sorting = { sortBy: 'full_name', sortType: 'alpha' }
//   if (!latLng) return sortItems(open, sorting)
//   const d = open.map((i) => {
//     const rcLatLng = i.address.latitude
//       ? [i.address.latitude, i.address.longitude]
//       : null
//     i.distance = rcLatLng ? getDistance(latLng, rcLatLng) : 1000
//     const [zone, priority] = parseDeliveryZone(i.delivery_zones)
//     i.zone = zone
//     i.priority = priority
//     i.inZone = zone ? inZone(latLng, zone) : false
//     return i
//   })
//   sorting = { sortBy: 'distance', sortType: 'order' }
//   const inZoneWithPriority = sortItems(
//     d.filter((i) => i.inZone && i.priority),
//     sorting
//   )
//   const inZoneWithoutPriority = sortItems(
//     d.filter((i) => i.inZone && !i.priority),
//     sorting
//   )
//   const outOfZone = sortItems(
//     d.filter((i) => !i.inZone),
//     sorting
//   )
//   return [...inZoneWithPriority, ...inZoneWithoutPriority, ...outOfZone]
// }

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
