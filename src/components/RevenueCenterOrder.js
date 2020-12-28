import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeRevenueCenterMsg } from '@open-tender/js'
import { selectOrder, selectAutoSelect } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig } from '../slices'
import RevenueCenterButtons from './RevenueCenterButtons'
import iconMap from './iconMap'
import styled from '@emotion/styled'

const RevenueCenterOrderView = styled('div')`
  margin: 1.5rem 0 0;

  button {
    margin: 0 1rem 1rem 0;
    &:last-child {
      margin: 0;
    }
  }
`

const RevenueCenterOrderMessage = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  margin: 0 0 1.5rem;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    // color: ${(props) => props.theme.fonts.headings.color};
    // font-weight: ${(props) => props.theme.boldWeight};
  }
`

export const RevenueCenterOrder = ({ revenueCenter, isMenu, isLanding }) => {
  const history = useHistory()
  const { serviceType, requestedAt } = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)
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
      {msg.message && (
        <RevenueCenterOrderMessage>
          <p>{msg.message}</p>
        </RevenueCenterOrderMessage>
      )}
      <div>
        {isMenu ? (
          !autoSelect ? (
            <ButtonStyled
              icon={iconMap.RefreshCw}
              onClick={() => history.push(`/locations`)}
            >
              Change Location
            </ButtonStyled>
          ) : null
        ) : (
          <RevenueCenterButtons
            revenueCenter={revenueCenter}
            isLanding={isLanding}
          />
        )}
      </div>
    </RevenueCenterOrderView>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
  isMenu: propTypes.bool,
  isOrder: propTypes.bool,
}

export default RevenueCenterOrder
