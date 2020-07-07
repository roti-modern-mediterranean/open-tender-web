import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import BarLoader from 'react-spinners/BarLoader'
import {
  setAddress,
  selectOrder,
  setRevenueCenter,
  selectAutoSelect,
  resetOrderType,
  fetchRevenueCenters,
  selectRevenueCenters,
  resetCheckout,
} from 'open-tender-redux'
import {
  calcMinDistance,
  makePickupRevenueCenters,
  makeDeliveryRevenueCenters,
  makePickupMesssaging,
  makeDeliveryMesssaging,
  renameLocation,
} from 'open-tender-js'
import { Button, GoogleMapsAutocomplete } from 'open-tender'

import { selectConfig, selectGeoLatLng } from '../slices'
import RevenueCenter from './RevenueCenter'

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
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { serviceType, orderType, isOutpost, address } = useSelector(
    selectOrder
  )
  const coords = address || geoLatLng
  const formattedAddress = address ? address.formatted_address : ''
  const autoSelect = useSelector(selectAutoSelect)
  const [title, setTitle] = useState(rcConfig.title)
  const [msg, setMsg] = useState(rcConfig.content)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const showRevenueCenters =
    !isLoading && !error && displayedRevenueCenters.length > 0

  useEffect(() => {
    if (orderType) {
      let params = { type: orderType }
      if (isOutpost) params = { ...params, is_outpost: true }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      dispatch(fetchRevenueCenters(params))
    }
  }, [orderType, isOutpost, coords, dispatch])

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
        setDisplayedRevenueCenters(pickupRevenueCenters)
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

  const names = rcConfig.locationName[isOutpost ? 'OUTPOST' : serviceType]
  const renamedTitle = renameLocation(title, names)
  const renamedError = renameLocation(error, names)
  const renamedMsg = renameLocation(msg, names)

  const handleStartOver = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    history.push(`/`)
    evt.target.blur()
  }

  return (
    <div className="card map__card ot-opacity-light border-radius slide-up ot-box-shadow">
      {isLoading ? (
        <div className="loading">
          <div className="loading__loader">
            <BarLoader size={100} loading={isLoading} />
          </div>
          <p>Retrieving nearest locations</p>
        </div>
      ) : (
        <div className="card__header">
          <h1 className="ot-font-size-h3">{renamedTitle}</h1>
          {error ? (
            <p className="ot-color-error ot-line-height">{renamedError}</p>
          ) : (
            <p className="ot-color-secondary ot-line-height">{renamedMsg}</p>
          )}
        </div>
      )}
      <div className="card__content">
        {!isLoading && (
          <>
            <GoogleMapsAutocomplete
              maps={maps}
              map={map}
              sessionToken={sessionToken}
              autocomplete={autocomplete}
              formattedAddress={formattedAddress}
              setAddress={(address) => dispatch(setAddress(address))}
              setCenter={setCenter}
            />
          </>
        )}
        {showRevenueCenters ? (
          <div className="rcs">
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
        ) : (
          <div className="card__footer">
            <Button
              text="Choose a different order type"
              classes="btn-link"
              onClick={handleStartOver}
            ></Button>
          </div>
        )}
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
