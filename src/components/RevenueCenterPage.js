import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectOrder,
  fetchRevenueCenter,
  resetOrderType,
  setOrderServiceType,
} from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import {
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectConfig,
} from '../slices'
import Background from './Background'
import RevenueCenter from './RevenueCenter/RevenueCenter'
import PageTitle from './PageTitle'

const makeImageUrl = (images, defaultImageUrl) => {
  if (!images) return defaultImageUrl || null
  const largeImage = images
    ? images.find((i) => i.type === 'LARGE_IMAGE')
    : null
  let imageUrl = largeImage ? largeImage.url : null
  return imageUrl || defaultImageUrl || null
}

const RevenueCenterPage = () => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState(null)
  const { slug } = useParams()
  const { geoLatLng, geoError } = useGeolocation()
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const order = useSelector(selectOrder)
  const { revenueCenter, loading } = order
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(setGeoLoading())
    dispatch(resetOrderType())
    dispatch(fetchRevenueCenter(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  useEffect(() => {
    if (revenueCenter) {
      const { images, settings, revenue_center_type } = revenueCenter
      setImageUrl(makeImageUrl(images, rcConfig.Background))
      const { service_types } = settings
      let serviceType = service_types.length
        ? service_types.includes('PICKUP')
          ? 'PICKUP'
          : 'DELIVERY'
        : null
      if (serviceType) {
        dispatch(setOrderServiceType(revenue_center_type, serviceType))
      }
    }
  }, [revenueCenter, rcConfig.Background, dispatch])

  return (
    <>
      {isBrowser && <Background imageUrl={imageUrl} />}
      <div className="content">
        {!isLoading &&
          (revenueCenter ? (
            <div className="map-content ot-bg-color-primary">
              <h1 className="sr-only">{revenueCenter.name}</h1>
              <div className="content__body">
                <div className="container">
                  <RevenueCenter
                    revenueCenter={revenueCenter}
                    classes="rc--solo"
                    showImage={true}
                    isLanding={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="map-content ot-bg-color-primary slide-up">
              <PageTitle
                title="Revenue center not found"
                subtitle="Sorry, but we couldn't find a revenue center matching this URL"
              />
              <div className="content__body">
                <div className="container">
                  <p>
                    Please try a different URL or{' '}
                    <Link to="/">head back to our home page</Link>.
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

RevenueCenterPage.displayName = 'RevenueCenterPage'
export default RevenueCenterPage
