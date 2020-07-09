import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderServiceType } from '@open-tender/redux'
import { selectConfig } from '../slices'
import OrderTypeButton from './OrderTypeButton'
import { Flag, ShoppingBag, Truck, Users, Gift } from 'react-feather'

const OrderType = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const { buttons } = config.home

  const handleOutpost = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
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
    outpost: handleOutpost,
    pickup: handlePickup,
    delivery: handleDelivery,
    catering: handleCatering,
    merch: handleMerch,
  }

  const icons = {
    outpost: <Flag size={null} />,
    pickup: <ShoppingBag size={null} />,
    delivery: <Truck size={null} />,
    catering: <Users size={null} />,
    merch: <Gift size={null} />,
  }

  return (
    <div className="content__buttons slide-up">
      {buttons.map((i) => (
        <OrderTypeButton
          key={i.type}
          {...i}
          icon={icons[i.type]}
          handler={handlers[i.type]}
        />
      ))}
    </div>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
