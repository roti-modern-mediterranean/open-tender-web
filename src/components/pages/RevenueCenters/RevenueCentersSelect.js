import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
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
} from '@open-tender/redux'
import { makeDisplayedRevenueCenters } from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Message,
  Preface,
  Text,
} from '@open-tender/components'

import { selectSettings, selectGeoLatLng } from '../../../slices'
import { Loading, PageContent, RevenueCenter } from '../..'
import styled from '@emotion/styled'
import iconMap from '../../iconMap'

const RevenueCentersSelectView = styled('div')``

const RevenueCentersSelectList = styled('ul')`
  margin: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.marginMobile};
  }

  & > li {
    margin: 2.5rem 0 0;
  }
`

const RevenueCentersSelectMessage = styled('div')`
  margin: 2rem 0;

  p:first-of-type {
    display: flex;
    align-items: center;
    line-height: 1;
    color: ${(props) => props.theme.colors.alert};

    span {
      display: block;
    }

    span:first-of-type {
      width: 2rem;
      height: 2rem;
      margin: 0 1rem 0 0;
      line-height: 0;
    }
  }

  p + p {
    margin: 0.5rem 0 0 3rem;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const RevenueCentersSelect = ({ setActive, activeMarker }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { maxDistance } = useSelector(selectSettings)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const {
    serviceType,
    orderType,
    isOutpost,
    address,
    requestedAt,
  } = useSelector(selectOrder)
  const coords = address || geoLatLng
  const autoSelect = useSelector(selectAutoSelect)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const missingAddress = serviceType === 'DELIVERY' && !address
  const hasCount = displayedRevenueCenters && displayedRevenueCenters.length > 0
  const showRevenueCenters = hasCount && !isLoading && !error && !missingAddress

  useEffect(() => {
    if (orderType) {
      let params = { type: orderType }
      if (isOutpost) params = { ...params, is_outpost: true }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      if (orderType === 'CATERING' && requestedAt) {
        params = { ...params, requestedAt }
      }
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
    ? displayedRevenueCenters.filter(
        (i) => i.revenue_center_id === activeMarker
      )
    : displayedRevenueCenters

  return (
    <RevenueCentersSelectView>
      {isLoading ? (
        <Loading
          text="Retrieving nearest locations..."
          style={{ textAlign: 'left' }}
        />
      ) : (
        <>
          {showRevenueCenters ? (
            <RevenueCentersSelectList>
              {filtered.map((revenueCenter) => (
                <li key={revenueCenter.revenue_center_id}>
                  <RevenueCenter
                    revenueCenter={revenueCenter}
                    setActive={setActive}
                    activeMarker={activeMarker}
                  />
                </li>
              ))}
            </RevenueCentersSelectList>
          ) : (
            <RevenueCentersSelectMessage>
              {missingAddress ? (
                <>
                  <p>
                    <span>{iconMap.AlertTriangle}</span>
                    <span>Please enter an address</span>
                  </p>
                  <p>
                    A full address with street number is required for delivery
                    orders.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span>{iconMap.AlertTriangle}</span>
                    <span>No locations near you</span>
                  </p>
                  <p>
                    Sorry, but we don't have any locations near you. Please
                    enter a different address or head back to our home page
                  </p>
                  <ButtonLink onClick={handleStartOver}>
                    Return to homepage
                  </ButtonLink>
                </>
              )}
            </RevenueCentersSelectMessage>
          )}
        </>
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
