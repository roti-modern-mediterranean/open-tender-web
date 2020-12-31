import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { makeRevenueCenterMsg } from '@open-tender/js'
import {
  selectOrder,
  selectGroupOrder,
  selectAutoSelect,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig } from '../../slices'
import iconMap from '../iconMap'
import RevenueCenterButtons from './RevenueCenterButtons'

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

  + div {
    margin-top: 1.5rem;
  }

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};

    span {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;
      color: ${(props) => props.theme.colors.alert};
      background-color: ${(props) => props.theme.bgColors.alert};
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        display: inline-block;
      }
    }
  }
`

export const RevenueCenterOrder = ({ revenueCenter, isMenu, isLanding }) => {
  const history = useHistory()
  const { serviceType, requestedAt } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)
  const hasGroupOrdering =
    revenueCenter && revenueCenter.settings.group_ordering
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
      {cartId && !hasGroupOrdering ? (
        <RevenueCenterOrderMessage>
          <p>
            <span>This location does not offer group ordering.</span>
          </p>
        </RevenueCenterOrderMessage>
      ) : (
        <>
          {msg.message && (
            <RevenueCenterOrderMessage>
              <p>
                <span>{msg.message}</span>
              </p>
            </RevenueCenterOrderMessage>
          )}
          {isMenu ? (
            !autoSelect ? (
              <div>
                <ButtonStyled
                  icon={iconMap.RefreshCw}
                  onClick={() => history.push(`/locations`)}
                >
                  Change Location
                </ButtonStyled>
              </div>
            ) : null
          ) : (
            <div>
              <RevenueCenterButtons
                revenueCenter={revenueCenter}
                isLanding={isLanding}
              />
            </div>
          )}
        </>
      )}
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
