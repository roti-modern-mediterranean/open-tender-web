import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectOrder,
  setRevenueCenter,
  selectAutoSelect,
  resetOrderType,
  fetchRevenueCenters,
  selectRevenueCenters,
  resetCheckout,
} from '@open-tender/redux'
import { makeDisplayedRevenueCenters, renameLocation } from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'

import { selectConfig, selectSettings, selectGeoLatLng } from '../../../slices'
import { Container, Loading, PageContent, RevenueCenter } from '../..'
import styled from '@emotion/styled'

const RevenueCentersSelectView = styled('div')`
  position: relative;
  z-index: 1;
  flex-grow: 1;
  background-color: ${(props) => props.theme.bgColors.primary};
  // padding: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 26rem 0 0;
    padding: 2rem 0 1rem;
  }
`

const RevenueCentersSelectHeader = styled('div')`
  h2 {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    margin: 0.5rem 0 0;
  }
`

const RevenueCentersSelect = () => {
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
        {isLoading ? (
          <Loading text="Retrieving nearest locations..." />
        ) : (
          <>
            <PageContent>
              <RevenueCentersSelectHeader>
                <h2>{renamedTitle}</h2>
                <p>{renamedError || renamedMsg}</p>
              </RevenueCentersSelectHeader>
              {showRevenueCenters ? (
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
