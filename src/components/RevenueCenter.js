import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectGroupOrder } from '@open-tender/redux'
import { stripTags } from '@open-tender/js'

import RevenueCenterOrder from './RevenueCenterOrder'
import RevenueCenterAction from './RevenueCenterAction'
import iconMap from './iconMap'

const RevenueCenter = ({
  revenueCenter,
  classes = '',
  showImage,
  isMenu,
  isLanding,
}) => {
  const { cartGuest } = useSelector(selectGroupOrder)
  const { address, images, hours, is_outpost } = revenueCenter
  const smallImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const largeImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const bgImage = smallImg.url || largeImg.url
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const phoneUrl = address.phone ? `tel:${address.phone}` : null
  const hoursDesc = hours.description ? stripTags(hours.description) : null
  classes = `rc ot-bg-color-primary ot-border-radius ot-border-color ${classes}`
  const hoursDescIcon = is_outpost ? iconMap['AlertCircle'] : iconMap['Clock']
  const hoursDescClass = is_outpost ? 'ot-color-alert' : ''

  const distance =
    revenueCenter.distance !== null && revenueCenter.distance !== undefined
      ? revenueCenter.distance
      : null

  return (
    <div className={classes}>
      {showImage && (
        <div
          className="rc__image bg-image ot-bg-color-secondary"
          style={bgStyle}
        >
          &nbsp;
        </div>
      )}
      <div className="rc__content">
        <div className="rc__container">
          <div className="rc__header">
            <h2 className={isLanding ? 'ot-font-size-h3' : 'ot-font-size-h4'}>
              {revenueCenter.name}
            </h2>
            {distance !== null && (
              <p className="ot-font-size-x-small">
                {distance.toFixed(2)} miles away
              </p>
            )}
          </div>
          <div className="rc__actions">
            <a
              className="no-link"
              href={revenueCenter.directions_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <RevenueCenterAction
                icon={iconMap['MapPin']}
                text={address.street}
              />
            </a>
            {phoneUrl && (
              <a
                className="no-link"
                href={phoneUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <RevenueCenterAction
                  icon={iconMap['Phone']}
                  text={address.phone}
                />
              </a>
            )}
            {hoursDesc && (
              <RevenueCenterAction
                icon={hoursDescIcon}
                iconClass={hoursDescClass}
                text={hoursDesc}
                arrow={null}
              />
            )}
          </div>
          {!cartGuest && (
            <RevenueCenterOrder
              revenueCenter={revenueCenter}
              isMenu={isMenu}
              isLanding={isLanding}
            />
          )}
        </div>
      </div>
    </div>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  classes: propTypes.string,
  showImage: propTypes.bool,
  isMenu: propTypes.bool,
  isLanding: propTypes.bool,
}

export default RevenueCenter
