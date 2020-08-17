import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { selectOrder, resetRevenueCenters } from '@open-tender/redux'
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
  const history = useHistory()
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()
  const config = useSelector(selectConfig)
  const order = useSelector(selectOrder)
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const hasTypes = order.orderType && order.serviceType
  const path = order.orderType === 'CATERING' ? '/catering' : '/locations'

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(setGeoLoading())
  }, [dispatch])

  useEffect(() => {
    hasTypes ? history.push(path) : dispatch(resetRevenueCenters())
  }, [hasTypes, path, history, dispatch])

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
