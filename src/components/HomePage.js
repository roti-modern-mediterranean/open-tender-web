import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectOrder, resetRevenueCenters } from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'
import { isBrowser } from 'react-device-detect'

import {
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
} from '../slices'
import OrderType from './OrderType'
import PageTitle from './PageTitle'
import Background from './Background'

const HomePage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()
  const config = useSelector(selectConfig)
  // const bgStyle = { backgroundImage: `url(${home.background}` }
  const order = useSelector(selectOrder)
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
        <PageTitle {...config.home} />
        <div className="content__body">
          <div className="container">
            <OrderType />
          </div>
        </div>
      </div>
    </>
  )
}

HomePage.displayName = 'HomePage'
export default HomePage
