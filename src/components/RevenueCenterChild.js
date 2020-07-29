import React from 'react'
import propTypes from 'prop-types'
import { stripTags } from '@open-tender/js'

import RevenueCenterAction from './RevenueCenterAction'
import iconMap from './iconMap'

const RevenueCenterDesc = ({ text }) => {
  return (
    <div className="rc__action">
      <p className="ot-color-secondary ot-line-height ot-font-size-small">
        {text}
      </p>
    </div>
  )
}

const RevenueCenterChild = ({ revenueCenter, classes = '' }) => {
  const { hours_desc, description } = revenueCenter
  const hoursDesc = hours_desc ? stripTags(hours_desc) : null
  const desc = description ? stripTags(description) : null
  const className = `rc ot-bg-color-primary ot-border-radius ot-border-color ${classes}`
  return (
    <div className={className}>
      <div className="rc__content">
        <div className="rc__container">
          <div className="rc__header">
            <h2 className="ot-font-size-h4">{revenueCenter.name}</h2>
          </div>
          <div className="rc__actions">
            {desc && <RevenueCenterDesc text={desc} />}
            {hoursDesc && (
              <RevenueCenterAction
                icon={iconMap['Clock']}
                iconClass="ot-color-secondary"
                text={hoursDesc}
                arrow={null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

RevenueCenterChild.displayName = 'RevenueCenterChild'
RevenueCenterChild.propTypes = {
  revenueCenter: propTypes.object,
  classes: propTypes.string,
}

export default RevenueCenterChild
