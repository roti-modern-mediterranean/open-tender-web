export const serviceTypeNamesMap = {
  PICKUP: 'Pickup',
  DELIVERY: 'Delivery',
}

export const orderTypeNamesMap = {
  OLO: 'Regular',
  CATERING: 'Catering',
  MERCH: 'Merch',
}

export const otherOrderTypesMap = {
  PICKUP: ['Delivery', 'Catering'],
  DELIVERY: ['Pickup', 'Catering'],
  CATERING: ['Pickup', 'Delivery'],
}

export const tenderTypeNamesMap = {
  CASH: 'Cash',
  CREDIT: 'Credit',
  LEVELUP: 'LevelUp',
  HOUSE_ACCOUNT: 'House Account',
  GIFT_CARD: 'Gift Card',
  COMP: 'Comp',
}

export const MAX_DISTANCE = 100

export const LOCATIONS_MESSAGES = {
  PICKUP: {
    address: {
      title: 'restaurants near you',
      msg: 'Please choose a location below.',
    },
    addressFar: {
      title: "Looks like we don't have any restaurants in your area",
      msg:
        'Sorry about that. Please enter a different address or head back and choose a different order type.',
    },
    geo: {
      title: 'restaurants in your area',
      msg: 'Please enter a zip code or address for a more accurate result.',
    },
    geoFar: {
      title: "Looks like we don't have any restaurants in your area",
      msg:
        'Please enter a zip code or address if you live in a different area.',
    },
    default: {
      title: 'Please choose a location',
      msg: 'Or enter a zip code to find the location nearest you.',
    },
  },
  DELIVERY: {
    default: {
      title: "Let's find the nearest location",
      msg: 'Please enter your address below.',
      error: null,
    },
    noStreet: {
      title: 'Please enter a street address',
      msg: '',
      error:
        'A full address with street number is required for delivery orders.',
    },
    hasDelivery: {
      title: 'Delivery is available!',
      msg: 'Please choose a location below.',
      error: null,
    },
    noDelivery: {
      title: "Delivery isn't available in your area",
      msg:
        "We're really sorry about that. Please enter a different address or head back and start a pickup order.",
      error: null,
    },
  },
}
