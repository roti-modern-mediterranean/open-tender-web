import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  selectOrder,
  fetchRevenueCenter,
  resetOrderType,
  setOrderServiceType,
} from 'open-tender-redux'
import { useGeolocation } from 'open-tender'

import {
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectConfig,
} from '../slices'
import Background from './Background'
import RevenueCenter from './RevenueCenter'

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
  const { id: revenueCenterId } = useParams()
  const { geoLatLng, geoError } = useGeolocation()
  const { revenueCenter: rcConfig } = useSelector(selectConfig)
  const order = useSelector(selectOrder)
  const { revenueCenter, loading } = order
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(setGeoLoading())
    dispatch(resetOrderType())
    dispatch(fetchRevenueCenter(revenueCenterId))
  }, [dispatch, revenueCenterId])

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
        dispatch(setOrderServiceType([revenue_center_type, serviceType]))
      }
    }
  }, [revenueCenter, rcConfig.Background, dispatch])

  return (
    <div className="content">
      <Background imageUrl={imageUrl} />
      {revenueCenter && !isLoading && (
        <div className="card card--rc overlay border-radius slide-up ot-box-shadow">
          <h1 className="sr-only">{revenueCenter.name}</h1>
          <div className="card__content">
            <RevenueCenter
              revenueCenter={revenueCenter}
              showImage={false}
              isLanding={true}
              classes="rc--solo"
            />
          </div>
        </div>
      )}
    </div>
  )
}

RevenueCenterPage.displayName = 'RevenueCenterPage'
export default RevenueCenterPage
