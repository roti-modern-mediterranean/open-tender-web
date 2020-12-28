import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  setAddress,
  selectOrder,
  setRevenueCenter,
  selectAutoSelect,
  resetOrderType,
  fetchRevenueCenters,
  selectRevenueCenters,
  resetCheckout,
} from '@open-tender/redux'
import { makeDisplayedRevenueCenters, renameLocation } from '@open-tender/js'
import { ButtonLink, GoogleMapsAutocomplete } from '@open-tender/components'

import { selectConfig, selectSettings, selectGeoLatLng } from '../../../slices'
import iconMap from '../../iconMap'
import {
  Container,
  Loading,
  PageTitle,
  PageContent,
  RevenueCenter,
} from '../..'
import styled from '@emotion/styled'

const RevenueCentersSelectView = styled('div')`
  position: relative;
  z-index: 1;
  margin: 4.5rem 0 0;
  background-color: ${(props) => props.theme.bgColors.primary};
`

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
  const { maxDistance, locationName } = useSelector(selectSettings)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { serviceType, orderType, isOutpost, address } = useSelector(
    selectOrder
  )
  const coords = address || geoLatLng
  const formattedAddress = address ? address.formatted_address : ''
  const autoSelect = useSelector(selectAutoSelect)
  const [title, setTitle] = useState(rcConfig.title)
  const [msg, setMsg] = useState(rcConfig.subtitle)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const missingAddress = serviceType === 'DELIVERY' && !address
  const hasCount = displayedRevenueCenters && displayedRevenueCenters.length > 0
  const showRevenueCenters = hasCount && !isLoading && !error && !missingAddress
  const names = locationName[isOutpost ? 'OUTPOST' : serviceType]
  const renamedTitle = renameLocation(title, names)
  const renamedError = renameLocation(error, names)
  const renamedMsg = renameLocation(msg, names)

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
      return history.push(`/menu/${revenueCenter.slug}`)
    },
    [dispatch, history]
  )

  useEffect(() => {
    const { title, msg, error, displayed } = makeDisplayedRevenueCenters(
      revenueCenters,
      serviceType,
      address,
      geoLatLng,
      maxDistance
    )
    const count = displayed ? displayed.length : 0
    if (count && autoSelect && !error && !missingAddress) {
      autoRouteCallack(displayed[0])
    } else {
      setTitle(title)
      setMsg(msg)
      setError(error)
      setDisplayedRevenueCenters(displayed)
    }
  }, [
    revenueCenters,
    serviceType,
    address,
    geoLatLng,
    maxDistance,
    autoSelect,
    autoRouteCallack,
    missingAddress,
  ])

  const handleStartOver = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    history.push(`/`)
    evt.target.blur()
  }

  return (
    <RevenueCentersSelectView>
      <Container>
        {isLoading && !hasCount ? (
          <Loading text="Retrieving nearest locations..." />
        ) : (
          <>
            <PageTitle
              title={renamedTitle}
              subtitle={!error ? renamedMsg : null}
              error={error ? renamedError : null}
            />
            <PageContent>
              <GoogleMapsAutocomplete
                maps={maps}
                map={map}
                sessionToken={sessionToken}
                autocomplete={autocomplete}
                formattedAddress={formattedAddress}
                setAddress={(address) => dispatch(setAddress(address))}
                setCenter={setCenter}
                icon={iconMap.Navigation}
              />
              {isLoading ? (
                <Loading text="Retrieving nearest locations..." />
              ) : showRevenueCenters ? (
                <ul>
                  {displayedRevenueCenters.map((revenueCenter) => (
                    <li key={revenueCenter.revenue_center_id}>
                      <RevenueCenter
                        revenueCenter={revenueCenter}
                        classes="rc--card"
                        showImage={isBrowser}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <ButtonLink onClick={handleStartOver}>
                  Choose a different order type
                </ButtonLink>
              )}
            </PageContent>
          </>
        )}
      </Container>
    </RevenueCentersSelectView>
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
