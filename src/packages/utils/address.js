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
  console.log(components)
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
