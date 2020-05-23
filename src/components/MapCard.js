import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import BarLoader from 'react-spinners/BarLoader'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleMapsAutocomplete } from '../packages'
import { selectConfig } from '../slices/configSlice'
import { setAddress, selectOrder } from '../slices/orderSlice'
import {
  fetchLocations,
  selectLocations,
  resetLocations,
} from '../slices/locationsSlice'
import { Location } from './Location'

const defaultMsg = 'Please enter your street address & choose an option.'

const MapCard = ({
  setCenter,
  center,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const { map: mapConfig, locations: locationsConfig } = useSelector(
    selectConfig
  )
  const { content } = mapConfig
  const { serviceType, orderType, address } = useSelector(selectOrder)
  const serviceTypeLower = serviceType ? serviceType.toLowerCase() : 'pickup'
  const formattedAddress = address ? address.formatted_address : ''
  const [title, setTitle] = useState(mapConfig.title)
  const [msg, setMsg] = useState(content[serviceTypeLower] || defaultMsg)
  const [error, setError] = useState(null)
  const { locations, loading } = useSelector(selectLocations)

  useEffect(() => {
    setMsg(content[serviceTypeLower])
  }, [serviceTypeLower, content])

  useEffect(() => {
    const missingStreet =
      serviceType === 'DELIVERY' && address !== null && !address.street
    const errMsg = missingStreet
      ? 'Please enter a street address for delivery orders'
      : null
    setError(errMsg)
    const count = !errMsg && address ? locations.length : 0
    const locationsTitle = locationsConfig.title || 'locations near you'
    const countMsg = count ? `${count} ${locationsTitle}` : title
    setTitle(countMsg)
  }, [serviceType, address, locations, locationsConfig.title, title])

  useEffect(() => {
    orderType && address
      ? dispatch(fetchLocations(orderType))
      : dispatch(resetLocations())
  }, [orderType, address, center, dispatch])

  const isLoading = loading === 'pending'

  return (
    <div className="card map__card overlay border-radius slide-up ot-box-shadow">
      <div className="card__header">
        {/* <p className="preface secondary-color">{subtitle}</p> */}
        <h1 className="ot-font-size-h3">{title}</h1>
        {error ? (
          <p className="ot-error-color">{error}</p>
        ) : address ? (
          <p className="secondary-color">
            Address found! Please choose a location below.
          </p>
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
        {isLoading ? (
          <div className="loading">
            <div className="loading__loader">
              <BarLoader size={100} laoding={isLoading} />
            </div>
            <p>Retrieving nearest locations</p>
          </div>
        ) : !error && locations.length ? (
          <div className="locations">
            <ul>
              {locations.map((location) => (
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

MapCard.displayName = 'MapCard'
MapCard.propTypes = {
  locationns: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default MapCard
