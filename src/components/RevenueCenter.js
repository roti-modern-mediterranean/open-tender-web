import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectGroupOrder } from '@open-tender/redux'
import { stripTags } from '@open-tender/js'
import { BgImage, Box } from '@open-tender/components'

import RevenueCenterOrder from './RevenueCenterOrder'
import RevenueCenterAction from './RevenueCenterAction'
import iconMap from './iconMap'
import styled from '@emotion/styled'

const RevenueCenterView = styled(Box)`
  position: relative;
  margin: 3rem 0 0;
  overflow: hidden;
`

const RevenueCenterImage = styled(BgImage)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 24rem;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

const RevenueCenterContent = styled('div')`
  padding: 0 24rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }

  > div {
    padding: 2rem 3rem 2rem 2rem;
  }
`

const RevenueCenterHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  & > * {
    display: block;
  }

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }

  p {
    padding-top: 0.4rem;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const RevenueCenterActions = styled('div')`
  a,
  button {
    display: block;
    width: 100%;
    text-align: left;
  }
`

const RevenueCenter = ({ revenueCenter, showImage, isMenu, isLanding }) => {
  const { cartId } = useSelector(selectGroupOrder)
  const { address, images, hours, is_outpost } = revenueCenter
  const smallImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const largeImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const bgImage = smallImg.url || largeImg.url
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const phoneUrl = address.phone ? `tel:${address.phone}` : null
  const hoursDesc = hours.description ? stripTags(hours.description) : null
  const hoursDescIcon = is_outpost ? iconMap.AlertCircle : iconMap.Clock

  const distance =
    revenueCenter.distance !== null && revenueCenter.distance !== undefined
      ? revenueCenter.distance
      : null

  return (
    <RevenueCenterView>
      {showImage && (
        <RevenueCenterImage style={bgStyle}>&nbsp;</RevenueCenterImage>
      )}
      <RevenueCenterContent>
        <div>
          <RevenueCenterHeader>
            <h2>{revenueCenter.name}</h2>
            {distance !== null && <p>{distance.toFixed(2)} miles away</p>}
          </RevenueCenterHeader>
          <RevenueCenterActions>
            <a
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
              <a href={phoneUrl} rel="noopener noreferrer" target="_blank">
                <RevenueCenterAction
                  icon={iconMap['Phone']}
                  text={address.phone}
                />
              </a>
            )}
            {hoursDesc && (
              <RevenueCenterAction
                icon={hoursDescIcon}
                text={hoursDesc}
                arrow={null}
              />
            )}
          </RevenueCenterActions>
          {!cartId && (
            <RevenueCenterOrder
              revenueCenter={revenueCenter}
              isMenu={isMenu}
              isLanding={isLanding}
            />
          )}
        </div>
      </RevenueCenterContent>
    </RevenueCenterView>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  showImage: propTypes.bool,
  isMenu: propTypes.bool,
  isLanding: propTypes.bool,
}

export default RevenueCenter
