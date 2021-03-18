import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectGroupOrder } from '@open-tender/redux'
import { stripTags } from '@open-tender/js'
import { BgImage, Preface } from '@open-tender/components'

import iconMap from '../iconMap'
import RevenueCenterOrder from './RevenueCenterOrder'
import { PrefaceTitle } from '..'
import { DetourSign } from '../icons'

const RevenueCenterView = styled('button')`
  display: block;
  width: 100%;
  text-align: left;
`

const RevenueCenterHeader = styled('span')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 0 1rem;

  h2 {
    display: block;
    line-height: 1;
  }

  span {
    position: relative;
    top: 0.1rem;
    display: block;
    flex: 0 0 2rem;
  }
`

const RevenueCenterContent = styled('span')`
  display: flex;
  align-items: flex-start;
`

const RevenueCenterImage = styled(BgImage)`
  display: block;
  flex: 0 0 7.8rem;
  // width: 7.8rem;
  height: 5.8rem;
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const RevenueCenterDetails = styled('span')`
  display: block;
  padding: 0 0 0 1rem;
`

const RevenueCenterDetailView = styled('span')`
  display: flex;
  align-items: flex-start;
  margin: 0 0 0.6rem;

  &:last-of-type {
    margin: 0;
  }
`

const RevenueCenterDetailIcon = styled('span')`
  display: block;
  position: relative;
  top: 0.1rem;
  width: 1.4rem;
  height: 1.4rem;
  line-height: 0;
  color: ${(props) => props.theme.fonts.body.color};
`

const RevenueCenterDetailText = styled('span')`
  display: block;
  width: 100%;
  padding: 0 0 0 1rem;
  line-height: 1;

  span {
    font-size: 1.5rem;
    font-weight: normal;
  }
`

const RevenueCenterDetail = ({ icon, text }) => (
  <RevenueCenterDetailView>
    <RevenueCenterDetailIcon>{icon}</RevenueCenterDetailIcon>
    <RevenueCenterDetailText>
      <Preface>{text}</Preface>
    </RevenueCenterDetailText>
  </RevenueCenterDetailView>
)

const RevenueCenter = ({
  revenueCenter,
  setActive,
  activeMarker,
  style = null,
}) => {
  // const { cartGuest } = useSelector(selectGroupOrder)
  const { address, images, hours, is_outpost } = revenueCenter
  const smallImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const largeImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const bgImage = smallImg.url || largeImg.url
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const hoursDesc = hours.description ? stripTags(hours.description) : null
  const hoursDescIcon = is_outpost ? iconMap.AlertCircle : iconMap.Clock

  const makeActive = (evt) => {
    evt.target.blur()
    setActive(revenueCenter)
  }

  return (
    <RevenueCenterView style={style} onClick={(evt) => makeActive(evt)}>
      <RevenueCenterHeader>
        <PrefaceTitle as="h2">{revenueCenter.name}</PrefaceTitle>
        <DetourSign color="#621C27" />
      </RevenueCenterHeader>
      <RevenueCenterContent>
        <RevenueCenterImage as="span" style={bgStyle} />
        <RevenueCenterDetails>
          <RevenueCenterDetail icon={iconMap.MapPin} text={address.street} />
          {address.phone && (
            <RevenueCenterDetail icon={iconMap.Phone} text={address.phone} />
          )}
          {hoursDesc && (
            <RevenueCenterDetail icon={hoursDescIcon} text={hoursDesc} />
          )}
        </RevenueCenterDetails>
      </RevenueCenterContent>
      {/* {!cartGuest && <RevenueCenterOrder revenueCenter={revenueCenter} />} */}
    </RevenueCenterView>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  setActive: propTypes.func,
  style: propTypes.object,
}

export default RevenueCenter
