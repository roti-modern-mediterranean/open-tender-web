import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleMapsAutocomplete } from '../packages'
import { MAX_DISTANCE, LOCATIONS_MESSAGES } from '../packages/utils/constants'
import { selectConfig } from '../slices/configSlice'
import { setAddress, selectOrder, setRevenueCenter } from '../slices/orderSlice'
import {
  fetchRevenueCenters,
  selectRevenueCenters,
} from '../slices/revenueCentersSlice'
import { selectGeoLatLng } from '../slices/geolocationSlice'
import { sortRevenueCenters } from '../packages/utils/maps'
import RevenueCenter from './RevenueCenter'
import BarLoader from 'react-spinners/BarLoader'

const calcMinDistance = (revenueCenters, maxDistance = MAX_DISTANCE) => {
  const withDistance = revenueCenters
    .filter((i) => i.distance !== null)
    .map((i) => i.distance)
  return withDistance ? Math.min(...withDistance) : maxDistance
}

const makePickupRevenueCenters = (revenueCenters) => {
  const hasPickup = revenueCenters.filter((i) =>
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

const makeDeliveryRevenueCenters = (revenueCenters) => {
  const hasDelivery = revenueCenters.filter((i) =>
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
        msg: `${count} ${restaurantMsg} to your address.`,
        error: null,
      }
    } else {
      return messages.DELIVERY.noDelivery
    }
  }
}

const RevenueCentersSelect = ({
  setCenter,
  center,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { serviceType, orderType, address } = useSelector(selectOrder)
  const coords = address || geoLatLng
  const formattedAddress = address ? address.formatted_address : ''
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const [title, setTitle] = useState(rcConfig.title)
  const [msg, setMsg] = useState(rcConfig.content)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const autoSelect =
    orderType && serviceType
      ? rcConfig.autoSelect[orderType][serviceType]
      : false

  useEffect(() => {
    if (orderType) {
      let params = { revenue_center_type: orderType }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      dispatch(fetchRevenueCenters(params))
    }
  }, [orderType, coords, dispatch])

  const autoRouteCallack = useCallback(
    (revenueCenter) => {
      dispatch(setRevenueCenter(revenueCenter))
      const rcType = revenueCenter.revenue_center_type.toLowerCase()
      return history.push(`/menu/${revenueCenter.slug}-${rcType}`)
    },
    [dispatch, history]
  )

  useEffect(() => {
    if (serviceType === 'PICKUP') {
      const pickupRevenueCenters = makePickupRevenueCenters(revenueCenters)
      const minDistance = calcMinDistance(pickupRevenueCenters)
      const count = pickupRevenueCenters.length
      if (count && autoSelect) {
        autoRouteCallack(pickupRevenueCenters[0])
      } else {
        const { title, msg } = makePickupMesssaging(
          address,
          geoLatLng,
          count,
          minDistance,
          rcConfig.maxDistance
        )
        setTitle(title)
        setMsg(msg)
        setError(null)
        setDisplayedRevenueCenters(makePickupRevenueCenters(revenueCenters))
      }
    } else {
      const deliveryRevenueCenters = makeDeliveryRevenueCenters(revenueCenters)
      const count = deliveryRevenueCenters.length
      const { title, msg, error } = makeDeliveryMesssaging(address, count)
      if (count && autoSelect && !error) {
        autoRouteCallack(deliveryRevenueCenters[0])
      } else {
        setTitle(title)
        setMsg(msg)
        setError(error)
        setDisplayedRevenueCenters(deliveryRevenueCenters)
      }
    }
  }, [
    serviceType,
    address,
    geoLatLng,
    revenueCenters,
    rcConfig.maxDistance,
    autoSelect,
    autoRouteCallack,
  ])

  return (
    <div className="card map__card overlay border-radius slide-up ot-box-shadow">
      <div className="card__header">
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
              <BarLoader size={100} loading={isLoading} />
            </div>
            <p>Retrieving nearest locations</p>
          </div>
        ) : !error && displayedRevenueCenters.length > 0 ? (
          <div className="revenueCenters">
            <ul>
              {displayedRevenueCenters.map((revenueCenter) => (
                <li key={revenueCenter.revenue_center_id}>
                  <RevenueCenter
                    revenueCenter={revenueCenter}
                    showImage={true}
                    isOrder={true}
                    classes="rc--card"
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

RevenueCentersSelect.displayName = 'RevenueCentersSelect'
RevenueCentersSelect.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default RevenueCentersSelect
