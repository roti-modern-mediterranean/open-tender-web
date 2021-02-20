import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import styled from '@emotion/styled'
import {
  resetRevenueCenters,
  resetOrderType,
  selectGroupOrder,
  resetGroupOrder,
  setOrderServiceType,
} from '@open-tender/redux'
import { Message, useGeolocation } from '@open-tender/components'

import {
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectSettings,
} from '../slices'
import { NavButtons } from '.'

const HomeContent = styled('div')`
  padding: 0 2.5rem 2.5rem;
  line-height: ${(props) => props.theme.lineHeight};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2.5rem;
    color: ${(props) => props.theme.colors.light};
    background-color: rgba(0, 0, 0, 0.3);
    border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
  }

  p {
    margin: 0.5em 0;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const makeContent = (content) => {
  if (!content || !content.length || !content[0].length) return null
  return (
    <HomeContent>
      {content.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
    </HomeContent>
  )
}

const OrderTypes = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { geoLatLng, geoError } = useGeolocation()
  const { home } = useSelector(selectConfig)
  const content = makeContent(home.content)
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}

  useEffect(() => {
    dispatch(setGeoLoading())
    dispatch(resetRevenueCenters())
    dispatch(resetOrderType())
  }, [dispatch])

  useEffect(() => {
    if (cartGuestId) dispatch(resetGroupOrder())
  }, [dispatch, cartGuestId])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

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
      {hasOrderTypes ? (
        <NavButtons buttons={buttons} />
      ) : (
        <Message color="error">
          This brand is not currently accepting online orders.
        </Message>
      )}
      {content}
    </div>
  )
}

OrderTypes.displayName = 'OrderTypes'
OrderTypes.propTypes = {
  content: propTypes.element,
}

export default OrderTypes
