import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderServiceType } from '@open-tender/redux'

import { selectConfig, selectSettings } from '../../../slices'
// import OrderTypeButton from './OrderTypeButton'
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

const HomeButtons = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderTypes } = useSelector(selectSettings)
  const { home } = useSelector(selectConfig)

  const handleOutpost = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    history.push('/locations')
    evt.target.blur()
  }

  const handleWalkin = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'WALKIN'))
    history.push('/locations')
    evt.target.blur()
  }

  const handlePickup = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
    evt.target.blur()
  }

  const handleDelivery = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    history.push('/locations')
    evt.target.blur()
  }

  const handleCatering = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    history.push('/catering')
    evt.target.blur()
  }

  const handleMerch = (evt) => {
    evt.preventDefault()
    dispatch(setOrderServiceType('MERCH', 'DELIVERY'))
    history.push('/locations')
    evt.target.blur()
  }

  const handleGiftCards = (evt) => {
    evt.preventDefault()
    history.push('/gift-cards')
    evt.target.blur()
  }

  const handleDonations = (evt) => {
    evt.preventDefault()
    history.push('/donations')
    evt.target.blur()
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

  return <NavButtons buttons={buttons} />
}

HomeButtons.displayName = 'HomeButtons'
export default HomeButtons
