import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeRevenueCenterMsg } from '@open-tender/js'
import { selectOrder, selectAutoSelect } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { selectConfig } from '../slices'
import RevenueCenterButtons from './RevenueCenterButtons'
import iconMap from './iconMap'

export const RevenueCenterOrder = ({ revenueCenter, isMenu, isLanding }) => {
  const history = useHistory()
  const { serviceType } = useSelector(selectOrder)

  const autoSelect = useSelector(selectAutoSelect)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const msg = makeRevenueCenterMsg(revenueCenter, serviceType, statusMessages)

  const handleChange = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  return (
    <div className="rc__order">
      {msg.message && (
        <div className="rc__order__message">
          <p className={`ot-font-size-small ${msg.className}`}>{msg.message}</p>
        </div>
      )}
      {isMenu ? (
        !autoSelect ? (
          <div className="rc__order__buttons">
            <Button
              text="Change Location"
              icon={iconMap['RefreshCw']}
              onClick={handleChange}
            />
          </div>
        ) : null
      ) : (
        <RevenueCenterButtons
          revenueCenter={revenueCenter}
          isLanding={isLanding}
        />
      )}
    </div>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
  isMenu: propTypes.bool,
  isOrder: propTypes.bool,
}

export default RevenueCenterOrder
