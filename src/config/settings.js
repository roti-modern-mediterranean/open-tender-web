const settingsConfig = {
  orderTypes: ['OUTPOST', 'PICKUP', 'DELIVERY', 'CATERING'],
  maxDistance: 100,
  locationName: {
    PICKUP: ['location', 'locations'],
    OUTPOST: ['outpost', 'outposts'],
    DELIVERY: ['location', 'locations'],
  },
  autoSelect: {
    OLO: {
      PICKUP: false,
      DELIVERY: false,
    },
    CATERING: {
      PICKUP: false,
      DELIVERY: true,
    },
    MERCH: {
      PICKUP: true,
      DELIVERY: true,
    },
  },
  accountSections: [
    'favorites',
    'recentOrders',
    'recentItems',
    'profile',
    'allergens',
    'addresses',
    'giftCards',
    'creditCards',
    'houseAccounts',
  ],
  displaySettings: {
    OLO: {
      calories: true,
      allergens: true,
      tags: true,
      menuImages: true,
      builderImages: true,
      madeFor: true,
      notes: true,
    },
    CATERING: {
      calories: false,
      allergens: false,
      tags: false,
      menuImages: true,
      builderImages: true,
      madeFor: false,
      notes: true,
    },
    MERCH: {
      calories: false,
      allergens: false,
      tags: false,
      menuImages: true,
      builderImages: true,
      madeFor: false,
      notes: false,
    },
  },
  googleMaps: {
    apiKey: 'AIzaSyCkllc7M-cYNzSRXO7KE-ZZKTPW59RroDk',
    defaultCenter: { lat: 41.889434, lng: -87.6377857 },
    zoom: 14,
    styles: {
      labelColor: '#666666',
      roadColor: '#1c1c1c',
      featureColor: '#1c1c1c',
      waterColor: '#1c1c1c',
      backgroundColor: '#000000',
    },
    icons: {
      user: {
        url:
          'https://s3.amazonaws.com/betterboh/u/img/prod/2/1590782366_marker-blinking-static_purple-25_120x120.png',
        size: { width: 70, height: 70 },
        anchor: { x: 35, y: 35 },
      },
      location: {
        url:
          'https://s3.amazonaws.com/betterboh/u/img/prod/2/1590271604_map-marker_black_120x160.png',
        size: { width: 30, height: 40 },
        anchor: null,
      },
      locationSelected: {
        url:
          'https://s3.amazonaws.com/betterboh/u/img/prod/2/1590271631_map-marker_purple_120x160.png',
        size: { width: 30, height: 40 },
        anchor: null,
      },
    },
  },
}

export default settingsConfig
