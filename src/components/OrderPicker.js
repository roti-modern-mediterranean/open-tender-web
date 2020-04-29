import React from 'react'
import { useDispatch } from 'react-redux'
import { chooseOrderServiceType } from '../slices/orderSlice'

export const OrderPicker = () => {
  const dispatch = useDispatch()
  return (
    <div class="picker border">
      <div class="picker__header">
        <h1>Welcome! Let's get to it.</h1>
        <p>Please choose an order type to get started.</p>
      </div>
      <div class="picker__buttons">
        <button
          className="picker__button border heading"
          aria-label="Order for Pickup"
          onClick={() => dispatch(chooseOrderServiceType(['OLO', 'PICKUP']))}
        >
          Order for Pickup
        </button>
        <button
          className="picker__button border heading"
          aria-label="Order for Delivery"
          onClick={() => dispatch(chooseOrderServiceType(['OLO', 'DELIVERY']))}
        >
          Order for Delivery
        </button>
        <button
          className="picker__button border heading"
          aria-label="Order Catering"
          onClick={() =>
            dispatch(chooseOrderServiceType(['CATERING', 'DELIVERY']))
          }
        >
          Order Catering
        </button>
      </div>
    </div>
  )
}
