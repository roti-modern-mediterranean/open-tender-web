import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderServiceType } from '@open-tender/redux'

import { selectConfig, selectSettings } from '../../../slices'
import { NavButtons } from '../..'
import {
  Flag,
  ShoppingBag,
  Truck,
  Users,
  Gift,
  Coffee,
  ShoppingCart,
  DollarSign,
} from 'react-feather'
import { useHistory } from 'react-router-dom'

const OrderTypeButtons = ({ content }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderTypes } = useSelector(selectSettings)
  const { home } = useSelector(selectConfig)

  const handleOutpost = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    history.push('/locations')
  }

  const handleWalkin = () => {
    dispatch(setOrderServiceType('OLO', 'WALKIN'))
    history.push('/locations')
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    history.push('/locations')
  }

  const handleCatering = () => {
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    history.push('/catering')
  }

  const handleMerch = () => {
    dispatch(setOrderServiceType('MERCH', 'DELIVERY'))
    history.push('/locations')
  }

  const handleGiftCards = () => {
    history.push('/gift-cards')
  }

  const handleDonations = () => {
    history.push('/donations')
  }

  const handlers = {
    OUTPOST: handleOutpost,
    WALKIN: handleWalkin,
    PICKUP: handlePickup,
    DELIVERY: handleDelivery,
    CATERING: handleCatering,
    MERCH: handleMerch,
    GIFT_CARDS: handleGiftCards,
    DONATIONS: handleDonations,
  }

  const icons = {
    OUTPOST: <Flag size={null} />,
    WALKIN: <Coffee size={null} />,
    PICKUP: <ShoppingBag size={null} />,
    DELIVERY: <Truck size={null} />,
    CATERING: <Users size={null} />,
    MERCH: <ShoppingCart size={null} />,
    GIFT_CARDS: <Gift size={null} />,
    DONATIONS: <DollarSign size={null} />,
  }

  const buttons = orderTypes.map((orderType) => ({
    ...home.orderTypes[orderType],
    icon: icons[orderType],
    onClick: handlers[orderType],
  }))

  return (
    <div>
      <NavButtons buttons={buttons} />
      {content}
    </div>
  )
}

OrderTypeButtons.displayName = 'OrderTypeButtons'
OrderTypeButtons.propTypes = {
  content: propTypes.element,
}

export default OrderTypeButtons
