import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderServiceType } from '../slices/orderSlice'
import { selectConfig } from '../slices/configSlice'
import { setGeoLatLng, setGeoError } from '../slices/geolocationSlice'
import useGeolocation from '../packages/useGeolocation'

const OrderType = () => {
  const { geoLatLng, geoError } = useGeolocation()
  const { home: homeConfig } = useSelector(selectConfig)
  const { title, subtitle, content, buttons } = homeConfig
  const dispatch = useDispatch()

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  return (
    <div className="card overlay border-radius slide-up">
      <div className="card__header">
        <p className="preface secondary-color">{subtitle}</p>
        <h1 className="ot-font-size-h3">{title}</h1>
        <p className="secondary-color">{content}</p>
      </div>
      <div className="card__content">
        <button
          className="card__button heading bg-color bg-hover-light ot-box-shadow"
          aria-label="Order for Pickup"
          onClick={() => dispatch(setOrderServiceType(['OLO', 'PICKUP']))}
        >
          {buttons.pickup || 'Order Pickup'}
        </button>
        <button
          className="card__button heading bg-color bg-hover-light ot-box-shadow"
          aria-label="Order for Delivery"
          onClick={() => dispatch(setOrderServiceType(['OLO', 'DELIVERY']))}
        >
          {buttons.delivery || 'Order Delivery'}
        </button>
        <button
          className="card__button heading bg-color bg-hover-light ot-box-shadow"
          aria-label="Order Catering"
          onClick={() =>
            dispatch(setOrderServiceType(['CATERING', 'DELIVERY']))
          }
        >
          {buttons.catering || 'Order Catering'}
        </button>
      </div>
    </div>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
