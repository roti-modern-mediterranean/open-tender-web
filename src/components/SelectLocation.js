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

const makePickupLocations = (locations) => {
  const hasPickup = locations.filter((i) =>
    i.settings.service_types.includes('PICKUP')
  )
  return sortRevenueCenters(hasPickup)
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
  // const geoLatLng = useSelector(selectGeoLatLng)
  const geoLatLng = null
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
  const showLocations =
    serviceType === 'PICKUP' || !!(serviceType === 'DELIVERY' && address)

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
    if (!showLocations) {
      setDisplayedLocations([])
      setTitle(mapConfig.title)
      setMsg(<p className="secondary-color">{defaultMsg}</p>)
    } else if (serviceType === 'PICKUP') {
      setError(null)
      const pickupLocations = makePickupLocations(locations)
      setDisplayedLocations(pickupLocations)
      if (address) {
        const count = locations.length
        setTitle(`${count} restaurants near you`)
        setMsg(
          <p className="secondary-color">Please choose a location below.</p>
        )
      } else {
        setTitle(`Choose a location`)
        setMsg(
          <p className="secondary-color">
            Or enter a zip code to find the location nearest you.
          </p>
        )
      }
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
    showLocations,
    serviceType,
    address,
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
        {error ? <p className="ot-error-color">{error}</p> : msg}
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
        ) : !error && showLocations && displayedLocations.length ? (
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
