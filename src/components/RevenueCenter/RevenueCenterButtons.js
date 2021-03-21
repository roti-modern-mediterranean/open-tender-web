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
import { ButtonGroupBig } from '..'

const RevenueCenterButtonsView = styled(ButtonGroupBig)`
  margin: 1.5rem 0;
  flex: 0;
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

  const handlePickup = (isCurbside = false) => {
    dispatch(setOrderServiceType(rcType, 'PICKUP', isOutpost, isCurbside))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
  }

  const handleCurbside = () => {
    dispatch(openModal({ type: 'curbside', args: { handlePickup } }))
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
      <ButtonStyled onClick={continueGroupOrder} size="big">
        Continue Group Order
      </ButtonStyled>
      <ButtonStyled onClick={startOver} color="secondary" size="big">
        Start A New Order
      </ButtonStyled>
    </RevenueCenterButtonsView>
  ) : cartId ? (
    hasGroupOrdering ? (
      <RevenueCenterButtonsView>
        <ButtonStyled
          onClick={isPickup ? handlePickup : handleDelivery}
          size="big"
        >
          Continue Group Order From Here
        </ButtonStyled>
        <ButtonStyled onClick={startOver} color="secondary" size="big">
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
        <ButtonStyled onClick={handlePickup} size="big">
          Pickup from this Location
        </ButtonStyled>
        <ButtonStyled onClick={handleCurbside} color="secondary" size="big">
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
        <ButtonStyled onClick={handleDelivery} size="big">
          Order Delivery
        </ButtonStyled>
        <ButtonStyled onClick={handleCurbside} color="secondary" size="big">
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
          <ButtonStyled onClick={handleDelivery} size="big">
            Order Catering Delivery
          </ButtonStyled>
        )}
        {hasPickup && (
          <ButtonStyled onClick={handlePickup} color="secondary" size="big">
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
