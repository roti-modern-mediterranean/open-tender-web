import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderServiceType } from '../slices/orderSlice'
import { selectConfig } from '../slices/configSlice'

const HomeCard = () => {
  const { home: homeConfig } = useSelector(selectConfig)
  const {
    title,
    subtitle,
    content,
    buttonPickup,
    buttonDelivery,
    buttonCatering,
  } = homeConfig
  const dispatch = useDispatch()
  return (
    <div className="card overlay slide-up">
      <div className="card__header">
        <p className="preface secondary-color">{subtitle}</p>
        <h1>{title}</h1>
        <p className="secondary-color">{content}</p>
      </div>
      <div className="card__content">
        <button
          className="card__button heading"
          aria-label="Order for Pickup"
          onClick={() => dispatch(setOrderServiceType(['OLO', 'PICKUP']))}
        >
          {buttonPickup}
        </button>
        <button
          className="card__button heading"
          aria-label="Order for Delivery"
          onClick={() => dispatch(setOrderServiceType(['OLO', 'DELIVERY']))}
        >
          {buttonDelivery}
        </button>
        <button
          className="card__button heading"
          aria-label="Order Catering"
          onClick={() =>
            dispatch(setOrderServiceType(['CATERING', 'DELIVERY']))
          }
        >
          {buttonCatering}
        </button>
      </div>
    </div>
  )
}

export default HomeCard
