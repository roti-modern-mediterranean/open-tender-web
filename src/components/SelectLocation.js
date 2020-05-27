import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import BarLoader from 'react-spinners/BarLoader'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleMapsAutocomplete } from '../packages'
import { selectConfig } from '../slices/configSlice'
import { setAddress, selectOrder } from '../slices/orderSlice'
import { fetchLocations, selectLocations } from '../slices/locationsSlice'
import { selectGeoLatLng } from '../slices/geolocationSlice'
import { Location } from './Location'
import { Link } from 'react-router-dom'
import { sortRevenueCenters } from '../packages/utils/maps'

const fallbackMsg = 'Please enter your street address & choose an option.'

const MIN_DISTANCE = 100

const MESSAGES = {
  pickup: {
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
}

const calcMinDistance = (locations) => {
  const withDistance = locations
    .filter((i) => i.distance !== null)
    .map((i) => i.distance)
  return withDistance ? Math.min(...withDistance) : MIN_DISTANCE
}

const makePickupLocations = (locations) => {
  const hasPickup = locations.filter((i) =>
    i.settings.service_types.includes('PICKUP')
  )
  return sortRevenueCenters(hasPickup)
}

const makePickupMesssaging = (
  address,
  geoLatLng,
  count,
  minDistance,
  messages = MESSAGES
) => {
  if (address) {
    if (minDistance > MIN_DISTANCE) {
      return messages.pickup.addressFar
    } else {
      return {
        title: `${count} ${MESSAGES.pickup.address.title}`,
        msg: messages.pickup.address.msg,
      }
    }
  } else if (geoLatLng) {
    if (minDistance > MIN_DISTANCE) {
      return messages.pickup.geoFar
    } else {
      return {
        title: `${count} ${MESSAGES.pickup.geo.title}`,
        msg: messages.pickup.geo.msg,
      }
    }
  } else {
    return messages.pickup.default
  }
}

const SelectLocation = ({
  setCenter,
  center,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const { map: mapConfig, locations: locConfig } = useSelector(selectConfig)
  const { content } = mapConfig
  const geoLatLng = useSelector(selectGeoLatLng)
  // const geoLatLng = null
  const { serviceType, orderType, address } = useSelector(selectOrder)
  const coords = address || geoLatLng
  const serviceTypeLower = serviceType ? serviceType.toLowerCase() : 'pickup'
  const formattedAddress = address ? address.formatted_address : ''
  const { locations, loading } = useSelector(selectLocations)
  const [title, setTitle] = useState(mapConfig.title)
  const defaultMsg = content[serviceTypeLower] || fallbackMsg
  const [msg, setMsg] = useState(defaultMsg)
  const [error, setError] = useState(null)
  const [displayedLocations, setDisplayedLocations] = useState([])
  const isLoading = loading === 'pending'

  useEffect(() => {
    setMsg(content[serviceTypeLower])
  }, [serviceTypeLower, content])

  useEffect(() => {
    if (orderType) {
      let params = { revenue_center_type: orderType }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      dispatch(fetchLocations(params))
    }
  }, [orderType, coords, dispatch])

  useEffect(() => {
    // if (!showLocations) {
    //   setDisplayedLocations([])
    //   setTitle(mapConfig.title)
    //   setMsg(<p className="secondary-color">{defaultMsg}</p>)
    // }
    if (serviceType === 'PICKUP') {
      setError(null)
      const pickupLocations = makePickupLocations(locations)
      setDisplayedLocations(makePickupLocations(locations))
      const minDistance = calcMinDistance(pickupLocations)
      const count = pickupLocations.length
      const { title, msg } = makePickupMesssaging(
        address,
        geoLatLng,
        count,
        minDistance
      )
      setTitle(title)
      setMsg(msg)
    } else {
      if (!address || !address.street) {
        setError('Please enter a street address for delivery orders.')
        setDisplayedLocations([])
        setTitle(mapConfig.title)
      } else {
        setError(null)
        const hasDelivery = locations.filter((i) =>
          i.settings.service_types.includes('DELIVERY')
        )
        const sorted = sortRevenueCenters(hasDelivery, true)
        const inZone = sorted.filter((i) => i.inZone)
        setDisplayedLocations(inZone)
        const count = inZone.length
        const newTitle = count
          ? 'Delivery is available!'
          : 'Delivery not available in your area'
        setTitle(newTitle)
        const restaurantMsg =
          count > 1 ? 'restaurants deliver' : 'restaurant delivers'
        const newMsg = count ? (
          `${count} ${restaurantMsg} to your address. Please choose one below.`
        ) : !isLoading ? (
          <span>
            We're sorry about that.
            <br />
            <Link to="/">
              Click here to head back and place a pickup order.
            </Link>
          </span>
        ) : (
          defaultMsg
        )
        setMsg(newMsg)
      }
    }
  }, [
    // MESSAGES,
    serviceType,
    address,
    geoLatLng,
    locations,
    locConfig.title,
    mapConfig.title,
    defaultMsg,
    isLoading,
  ])

  return (
    <div className="card map__card overlay border-radius slide-up ot-box-shadow">
      <div className="card__header">
        {/* <p className="preface secondary-color">{subtitle}</p> */}
        <h1 className="ot-font-size-h3">{title}</h1>
        {error ? (
          <p className="ot-error-color">{error}</p>
        ) : (
          <p className="secondary-color">{msg}</p>
        )}
      </div>
      <div className="card__content">
        <GoogleMapsAutocomplete
          maps={maps}
          map={map}
          sessionToken={sessionToken}
          autocomplete={autocomplete}
          formattedAddress={formattedAddress}
          setAddress={(address) => dispatch(setAddress(address))}
          setCenter={setCenter}
        />
        {isLoading && address ? (
          <div className="loading">
            <div className="loading__loader">
              <BarLoader size={100} laoding={isLoading} />
            </div>
            <p>Retrieving nearest locations</p>
          </div>
        ) : !error && displayedLocations.length > 0 ? (
          <div className="locations">
            <ul>
              {displayedLocations.map((location) => (
                <li key={location.location_id}>
                  <Location
                    location={location}
                    showImage={true}
                    isOrder={true}
                    classes="location--card"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

SelectLocation.displayName = 'SelectLocation'
SelectLocation.propTypes = {
  locationns: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default SelectLocation
