import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleMapsAutocomplete } from '../packages'
import { MAX_DISTANCE, LOCATIONS_MESSAGES } from '../packages/utils/constants'
import { selectConfig } from '../slices/configSlice'
import { setAddress, selectOrder, setLocation } from '../slices/orderSlice'
import { fetchLocations, selectLocations } from '../slices/locationsSlice'
import { selectGeoLatLng } from '../slices/geolocationSlice'
import { sortRevenueCenters } from '../packages/utils/maps'
import Location from './Location'
import BarLoader from 'react-spinners/BarLoader'

const calcMinDistance = (locations, maxDistance = MAX_DISTANCE) => {
  const withDistance = locations
    .filter((i) => i.distance !== null)
    .map((i) => i.distance)
  return withDistance ? Math.min(...withDistance) : maxDistance
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
  maxDistance = MAX_DISTANCE,
  messages = LOCATIONS_MESSAGES
) => {
  if (address) {
    if (minDistance >= maxDistance) {
      return messages.PICKUP.addressFar
    } else {
      return {
        title: `${count} ${messages.PICKUP.address.title}`,
        msg: messages.PICKUP.address.msg,
      }
    }
  } else if (geoLatLng) {
    if (minDistance >= maxDistance) {
      return messages.PICKUP.geoFar
    } else {
      return {
        title: `${count} ${messages.PICKUP.geo.title}`,
        msg: messages.PICKUP.geo.msg,
      }
    }
  } else {
    return messages.PICKUP.default
  }
}

const makeDeliveryLocations = (locations) => {
  const hasDelivery = locations.filter((i) =>
    i.settings.service_types.includes('DELIVERY')
  )
  const sorted = sortRevenueCenters(hasDelivery, true)
  return sorted.filter((i) => i.inZone)
}

const makeDeliveryMesssaging = (
  address,
  count,
  messages = LOCATIONS_MESSAGES
) => {
  if (!address) {
    return messages.DELIVERY.default
  } else if (!address.street) {
    return messages.DELIVERY.noStreet
  } else {
    if (count) {
      const restaurantMsg =
        count > 1 ? 'restaurants deliver' : 'restaurant delivers'
      return {
        title: messages.DELIVERY.hasDelivery.title,
        msg: `${count} ${restaurantMsg} to your address. Please choose one below.`,
        error: null,
      }
    } else {
      return messages.DELIVERY.noDelivery
    }
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
  const history = useHistory()
  const { locations: locConfig } = useSelector(selectConfig)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { serviceType, orderType, address } = useSelector(selectOrder)
  const coords = address || geoLatLng
  const formattedAddress = address ? address.formatted_address : ''
  const { locations, loading } = useSelector(selectLocations)
  const [title, setTitle] = useState(locConfig.title)
  const [msg, setMsg] = useState(locConfig.content)
  const [error, setError] = useState(null)
  const [displayedLocations, setDisplayedLocations] = useState([])
  const isLoading = loading === 'pending'
  const autoSelect = locConfig.autoSelect[orderType][serviceType]

  useEffect(() => {
    if (orderType) {
      let params = { revenue_center_type: orderType }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      dispatch(fetchLocations(params))
    }
  }, [orderType, coords, dispatch])

  const autoRouteCallack = useCallback(
    (location) => {
      dispatch(setLocation(location))
      const rcType = location.revenue_center_type.toLowerCase()
      return history.push(`/menu/${location.slug}-${rcType}`)
    },
    [dispatch, history]
  )

  useEffect(() => {
    if (serviceType === 'PICKUP') {
      const pickupLocations = makePickupLocations(locations)
      const minDistance = calcMinDistance(pickupLocations)
      const count = pickupLocations.length
      if (count && autoSelect) {
        autoRouteCallack(pickupLocations[0])
      } else {
        const { title, msg } = makePickupMesssaging(
          address,
          geoLatLng,
          count,
          minDistance,
          locConfig.maxDistance
        )
        setTitle(title)
        setMsg(msg)
        setError(null)
        setDisplayedLocations(makePickupLocations(locations))
      }
    } else {
      const deliveryLocations = makeDeliveryLocations(locations)
      const count = deliveryLocations.length
      const { title, msg, error } = makeDeliveryMesssaging(address, count)
      if (count && autoSelect && !error) {
        autoRouteCallack(deliveryLocations[0])
      } else {
        setTitle(title)
        setMsg(msg)
        setError(error)
        setDisplayedLocations(deliveryLocations)
      }
    }
  }, [
    serviceType,
    address,
    geoLatLng,
    locations,
    locConfig.maxDistance,
    autoSelect,
    autoRouteCallack,
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
