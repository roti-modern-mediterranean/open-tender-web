import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderServiceType } from '@open-tender/redux'

import { selectConfig, selectSettings } from '../slices'
import OrderTypeButton from './OrderTypeButton'
import { Flag, ShoppingBag, Truck, Users, Gift, Coffee } from 'react-feather'

const OrderType = () => {
  const dispatch = useDispatch()
  const { orderTypes } = useSelector(selectSettings)
  const { home } = useSelector(selectConfig)

  const handleOutpost = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    evt.target.blur()
  }

  const handleWalkin = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'WALKIN'))
    evt.target.blur()
  }

  const handlePickup = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    evt.target.blur()
  }

  const handleDelivery = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    evt.target.blur()
  }

  const handleCatering = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    evt.target.blur()
  }

  const handleMerch = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('MERCH', 'DELIVERY'))
    evt.target.blur()
  }

  const handlers = {
    OUTPOST: handleOutpost,
    WALKIN: handleWalkin,
    PICKUP: handlePickup,
    DELIVERY: handleDelivery,
    CATERING: handleCatering,
    MERCH: handleMerch,
  }

  const icons = {
    OUTPOST: <Flag size={null} />,
    WALKIN: <Coffee size={null} />,
    PICKUP: <ShoppingBag size={null} />,
    DELIVERY: <Truck size={null} />,
    CATERING: <Users size={null} />,
    MERCH: <Gift size={null} />,
  }

  return (
    <div className="content__buttons slide-up">
      {orderTypes.map((orderType) => (
        <OrderTypeButton
          key={orderType}
          {...home.orderTypes[orderType]}
          icon={icons[orderType]}
          handler={handlers[orderType]}
        />
      ))}
    </div>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
