import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { makeRevenueCenterMsg } from '@open-tender/js'
import { selectOrder, selectGroupOrder } from '@open-tender/redux'

import { selectConfig } from '../../slices'
import RevenueCenterButtons from './RevenueCenterButtons'

const RevenueCenterOrderView = styled('div')`
  margin: 1rem 0 0;
`

const RevenueCenterOrderMessage = styled('p')`
  line-height: ${(props) => props.theme.lineHeight};
  font-size: 1.1rem;
`

export const RevenueCenterOrder = ({ revenueCenter }) => {
  const { serviceType, requestedAt } = useSelector(selectOrder)
  const { cartId, cartGuest } = useSelector(selectGroupOrder)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const msg = makeRevenueCenterMsg(
    revenueCenter,
    serviceType,
    requestedAt,
    statusMessages
  )

  return (
    <RevenueCenterOrderView>
      {cartId ? (
        <RevenueCenterOrderMessage>
          You're currently placing a group order as the owner.
        </RevenueCenterOrderMessage>
      ) : cartGuest ? (
        <RevenueCenterOrderMessage>
          You're currently participating in a group order.
        </RevenueCenterOrderMessage>
      ) : msg.message ? (
        <RevenueCenterOrderMessage>{msg.message}</RevenueCenterOrderMessage>
      ) : null}
      <RevenueCenterButtons revenueCenter={revenueCenter} />
    </RevenueCenterOrderView>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
}

export default RevenueCenterOrder
