import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectOrder,
  setRevenueCenter,
  selectAutoSelect,
  resetOrderType,
  fetchRevenueCenters,
  selectRevenueCenters,
  resetCheckout,
  setServiceType,
} from '@open-tender/redux'
import { makeDisplayedRevenueCenters } from '@open-tender/js'
import { Preface } from '@open-tender/components'

import { selectSettings, selectGeoLatLng } from '../../../slices'
import { InlineLink, Loading, RevenueCenter } from '../..'
import RevenueCentersAlert from './RevenueCentersAlert'

const RevenueCentersSelectView = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 0 2.5rem 2.5rem;
`

const RevenueCentersSelectList = styled('ul')`
  & > li {
    margin: 2.5rem 0 0;
    &:first-of-type {
      margin: 0;
    }
  }
`

const RevenueCentersSelectLink = styled(Preface)`
  font-weight: 500;
  font-size: 1.8rem;

  button:hover & {
    color: ${(props) => props.theme.colors.paprika};
  }
`

const RevenueCentersSelect = ({ setActive, activeMarker }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { maxDistance } = useSelector(selectSettings)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { serviceType, orderType, isOutpost, address, requestedAt } =
    useSelector(selectOrder)
  const coords = address || geoLatLng
  const autoSelect = useSelector(selectAutoSelect)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const missingStreet = address ? !address.street : true
  const missingAddress = serviceType === 'DELIVERY' && missingStreet
  const hasCount = displayedRevenueCenters && displayedRevenueCenters.length > 0
  const showRevenueCenters = hasCount && !isLoading && !error && !missingAddress
  const revenueCenterIds = displayedRevenueCenters.map(
    (i) => i.revenue_center_id
  )
  const loadingMsg =
    orderType === 'CATERING'
      ? 'Finding the closest location...'
      : 'Retrieving nearest locations...'

  useEffect(() => {
    if (orderType) {
      let params = { type: orderType }
      if (isOutpost) params = { ...params, is_outpost: true }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      dispatch(fetchRevenueCenters(params))
    }
  }, [orderType, serviceType, isOutpost, coords, requestedAt, dispatch])

  const autoRouteCallack = useCallback(
    (revenueCenter) => {
      dispatch(setRevenueCenter(revenueCenter))
      return history.push(`/menu/${revenueCenter.slug}`)
    },
    [dispatch, history]
  )

  useEffect(() => {
    const { error, displayed } = makeDisplayedRevenueCenters(
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

  const handleStartOver = () => {
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    history.push(`/`)
  }

  const filtered = activeMarker
    ? revenueCenters.filter((i) => i.revenue_center_id === activeMarker)
    : displayedRevenueCenters

  return (
    <RevenueCentersSelectView>
      {isLoading ? (
        <Loading text={loadingMsg} style={{ textAlign: 'left' }} />
      ) : showRevenueCenters ? (
        <RevenueCentersSelectList>
          {filtered.map((revenueCenter) => (
            <li key={revenueCenter.revenue_center_id}>
              <RevenueCenter
                revenueCenter={revenueCenter}
                setActive={setActive}
                activeMarker={activeMarker}
                hasService={revenueCenterIds.includes(
                  revenueCenter.revenue_center_id
                )}
              />
            </li>
          ))}
        </RevenueCentersSelectList>
      ) : missingAddress ? (
        <RevenueCentersAlert
          title="Please enter an address"
          subtitle="A full address with street number is required for delivery orders, or you can switch to pick up."
        >
          <InlineLink onClick={() => dispatch(setServiceType('PICKUP'))}>
            <RevenueCentersSelectLink>
              Switch to pickup
            </RevenueCentersSelectLink>
          </InlineLink>
        </RevenueCentersAlert>
      ) : (
        <RevenueCentersAlert
          title="No locations near you"
          subtitle="Sorry, but we don't have any locations near you. Please
                    enter a different address or head back to our home page."
        >
          <InlineLink onClick={handleStartOver}>
            <RevenueCentersSelectLink>
              Return to homepage
            </RevenueCentersSelectLink>
          </InlineLink>
        </RevenueCentersAlert>
      )}
    </RevenueCentersSelectView>
  )
}

RevenueCentersSelect.displayName = 'RevenueCentersSelect'
RevenueCentersSelect.propTypes = {
  setActive: propTypes.func,
  activeMarker: propTypes.number,
}

export default RevenueCentersSelect
