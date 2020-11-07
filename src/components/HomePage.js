import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  resetRevenueCenters,
  resetOrderType,
  selectGroupOrder,
  resetGroupOrder,
} from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import {
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectSettings,
} from '../slices'
import OrderType from './OrderType'
import PageTitle from './PageTitle'
import Background from './Background'

const HomePage = () => {
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()
  const config = useSelector(selectConfig)
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(setGeoLoading())
    dispatch(resetRevenueCenters())
    dispatch(resetOrderType())
  }, [dispatch])

  useEffect(() => {
    if (cartGuestId) dispatch(resetGroupOrder())
  }, [dispatch, cartGuestId])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  return (
    <>
      {isBrowser && <Background imageUrl={config.home.background} />}
      <div className="content">
        {hasOrderTypes ? (
          <>
            <PageTitle {...config.home} />
            <div className="content__body">
              <div className="container">
                <OrderType />
              </div>
            </div>
          </>
        ) : (
          <PageTitle
            title="Online ordering is currently closed"
            subtitle="We're very sorry for the inconvenience. Please try back at a later time."
          />
        )}
        {config.home.content && config.home.content.length > 0 && (
          <div className="content__footer ot-line-height slide-up">
            <div className="container">
              <div className="content__text">
                {config.home.content.map((i, index) => (
                  <p key={index}>{i}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

HomePage.displayName = 'HomePage'
export default HomePage
