import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import BarLoader from 'react-spinners/BarLoader'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleMapsAutocomplete } from '../packages'
import { selectConfig } from '../slices/configSlice'
import { setAddress, selectOrder } from '../slices/orderSlice'
import { fetchLocations, selectLocations } from '../slices/locationsSlice'
import { Location } from './Location'
import { Link } from 'react-router-dom'

const fallbackMsg = 'Please enter your street address & choose an option.'

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
  const { serviceType, orderType, address } = useSelector(selectOrder)
  const serviceTypeLower = serviceType ? serviceType.toLowerCase() : 'pickup'
  const formattedAddress = address ? address.formatted_address : ''
  const { locations, loading } = useSelector(selectLocations)
  const [title, setTitle] = useState(mapConfig.title)
  const defaultMsg = content[serviceTypeLower] || fallbackMsg
  const [msg, setMsg] = useState(defaultMsg)
  const [error, setError] = useState(null)
  const [displayedLocations, setDisplayedLocations] = useState([])

  useEffect(() => {
    setMsg(content[serviceTypeLower])
  }, [serviceTypeLower, content])

  useEffect(() => {
    if (orderType && address) {
      const params = {
        revenue_center_type: orderType,
        lat: address.lat,
        lng: address.lng,
      }
      dispatch(fetchLocations(params))
    }
  }, [orderType, address, center, dispatch])

  useEffect(() => {
    if (address) {
      if (serviceType === 'DELIVERY') {
        if (!address.street) {
          setError('Please enter a street address for delivery orders.')
          setDisplayedLocations([])
          setTitle(mapConfig.title)
        } else {
          setError(null)
          const deliveryLocations = locations.filter(
            (i) => i.user.in_delivery_zone
          )
          setDisplayedLocations(deliveryLocations)
          const count = deliveryLocations.length
          const newTitle = count
            ? 'Delivery is available!'
            : 'Delivery not available in your area'
          setTitle(newTitle)
          const restaurantMsg =
            count > 1 ? 'restaurants deliver' : 'restaurant delivers'
          const newMsg = count ? (
            `${count} ${restaurantMsg} to your address. Please choose one below.`
          ) : (
            <span>
              We're sorry about that.{' '}
              <Link to="/">
                Click here to head back and place a pickup order.
              </Link>
            </span>
          )
          setMsg(newMsg)
        }
      } else {
        setError(null)
        setDisplayedLocations(locations)
        const count = locations.length
        const newTitle = `${count} restaurants near you`
        const newMsg = 'Please choose a location below.'
        setTitle(newTitle)
        setMsg(newMsg)
      }
    } else {
      setDisplayedLocations([])
      setTitle(mapConfig.title)
      setMsg(defaultMsg)
    }
  }, [
    serviceType,
    address,
    locations,
    locConfig.title,
    mapConfig.title,
    defaultMsg,
  ])

  const isLoading = loading === 'pending'

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
        ) : !error && address && displayedLocations.length ? (
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
