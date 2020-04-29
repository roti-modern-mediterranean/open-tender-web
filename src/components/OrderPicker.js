import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chooseOrderServiceType } from '../slices/orderSlice'
import { config } from '../slices/configSlice'

export const OrderPicker = () => {
  const { picker } = useSelector(config)
  const {
    title,
    subtitle,
    content,
    buttonPickup,
    buttonDelivery,
    buttonCatering,
  } = picker
  const dispatch = useDispatch()
  return (
    <div className="picker overlay slide-up">
      <div className="picker__header">
        <p className="preface secondary">{subtitle}</p>
        <h1>{title}</h1>
        <p className="secondary">{content}</p>
      </div>
      <div className="picker__buttons">
        <button
          className="picker__button heading"
          aria-label="Order for Pickup"
          onClick={() => dispatch(chooseOrderServiceType(['OLO', 'PICKUP']))}
        >
          {buttonPickup}
        </button>
        <button
          className="picker__button heading"
          aria-label="Order for Delivery"
          onClick={() => dispatch(chooseOrderServiceType(['OLO', 'DELIVERY']))}
        >
          {buttonDelivery}
        </button>
        <button
          className="picker__button heading"
          aria-label="Order Catering"
          onClick={() =>
            dispatch(chooseOrderServiceType(['CATERING', 'DELIVERY']))
          }
        >
          {buttonCatering}
        </button>
      </div>
    </div>
  )
}
