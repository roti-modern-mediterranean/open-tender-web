import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectGroupOrder,
  selectOrder,
  setOrderServiceType,
  setAddress,
  setRevenueCenter,
  selectMenuSlug,
  resetGroupOrder,
  resetOrder,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import RevenueCentersAlert from '../pages/RevenueCenters/RevenueCentersAlert'
import styled from '@emotion/styled'
import { openModal } from '../../slices'

const RevenueCenterButtonsView = styled('div')`
  margin: 1.5rem 0;
  flex: 0;

  button {
    width: 100%;
    border-radius: ${(props) => props.theme.border.radius};

    &:first-of-type {
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
    }
  }

  button + button {
    margin-top: 1.5rem;
  }
`

export const RevenueCenterButtons = ({ revenueCenter }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { cartId, cartGuest } = useSelector(selectGroupOrder)
  const { orderType, serviceType } = useSelector(selectOrder)
  const {
    slug,
    settings,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
  } = revenueCenter
  const { first_times: ft, order_times: ot } = settings
  const hasGroupOrdering =
    revenueCenter && revenueCenter.settings.group_ordering
  const currentMenuSlug = useSelector(selectMenuSlug)
  const menuSlug = `/menu/${slug}`
  const hasPickup = (ft && ft.PICKUP) || (ot && ot.PICKUP)
  const hasDelivery = (ft && ft.DELIVERY) || (ot && ot.DELIVERY)
  const isPickup = orderType === 'OLO' && serviceType === 'PICKUP'
  const isDelivery = orderType === 'OLO' && serviceType === 'DELIVERY'
  const isCatering = orderType === 'CATERING'

  const handlePickup = () => {
    dispatch(setOrderServiceType(rcType, 'PICKUP', isOutpost))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
  }

  const handleCurbside = () => {
    dispatch(openModal({ type: 'curbside', args: { revenueCenter } }))
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType(rcType, 'DELIVERY', isOutpost))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
  }

  const continueGroupOrder = () => {
    history.push(currentMenuSlug)
  }

  const startOver = () => {
    dispatch(resetGroupOrder())
    dispatch(resetOrder())
    history.push('/')
  }

  return cartGuest ? (
    <RevenueCenterButtonsView>
      <ButtonStyled onClick={continueGroupOrder}>
        Continue Group Order
      </ButtonStyled>
      <ButtonStyled onClick={startOver} color="secondary">
        Start A New Order
      </ButtonStyled>
    </RevenueCenterButtonsView>
  ) : cartId ? (
    hasGroupOrdering ? (
      <RevenueCenterButtonsView>
        <ButtonStyled onClick={isPickup ? handlePickup : handleDelivery}>
          Continue Group Order From Here
        </ButtonStyled>
        <ButtonStyled onClick={startOver} color="secondary">
          Start A New Order
        </ButtonStyled>
      </RevenueCenterButtonsView>
    ) : (
      <RevenueCentersAlert
        title="This location does not offer group ordering"
        subtitle="Please choose a different location in order to continue your group order."
      />
    )
  ) : isPickup ? (
    hasPickup ? (
      <RevenueCenterButtonsView>
        <ButtonStyled onClick={handlePickup}>Order Pickup</ButtonStyled>
        <ButtonStyled onClick={handleCurbside} color="secondary">
          Curbside Pickup
        </ButtonStyled>
      </RevenueCenterButtonsView>
    ) : (
      <RevenueCentersAlert
        title="Pickup not currently available"
        subtitle="We're sorry, but pickup isn't currently availalbe at this location. Please try a different location or address."
      />
    )
  ) : isDelivery ? (
    hasDelivery ? (
      <RevenueCenterButtonsView>
        <ButtonStyled onClick={handleDelivery}>Order Delivery</ButtonStyled>
        <ButtonStyled onClick={handleCurbside} color="secondary">
          Curbside Pickup
        </ButtonStyled>
      </RevenueCenterButtonsView>
    ) : (
      <RevenueCentersAlert
        title="Delivery not currently available"
        subtitle="We're sorry, but delivery isn't currently availalbe at this location. Please try a different location or address."
      />
    )
  ) : isCatering ? (
    hasDelivery || hasPickup ? (
      <RevenueCenterButtonsView>
        {hasDelivery && (
          <ButtonStyled onClick={handleDelivery}>
            Order Catering Delivery
          </ButtonStyled>
        )}
        {hasPickup && (
          <ButtonStyled onClick={handlePickup} color="secondary">
            Order Catering Pickup
          </ButtonStyled>
        )}
      </RevenueCenterButtonsView>
    ) : (
      <RevenueCentersAlert
        title="Delivery not currently available"
        subtitle="We're sorry, but delivery isn't currently availalbe at this location. Please try a different location or address."
      />
    )
  ) : null
}

RevenueCenterButtons.displayName = 'RevenueCenterButtons'
RevenueCenterButtons.propTypes = {
  revenueCenter: propTypes.object,
}

export default RevenueCenterButtons
