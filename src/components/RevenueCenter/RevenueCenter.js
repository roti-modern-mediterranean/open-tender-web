import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { stripTags } from '@open-tender/js'
import { useTheme } from '@emotion/react'
import { BgImage, ButtonStyled, Preface } from '@open-tender/components'

import iconMap from '../iconMap'
import RevenueCenterOrder from './RevenueCenterOrder'
import { PrefaceTitle } from '..'
import { CurbsidePickup, DetourSign } from '../icons'
import RevenueCentersAlert from '../pages/RevenueCenters/RevenueCentersAlert'

const RevenueCenterContainer = styled('span')`
  position: relative;
  display: block;
`

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
`

const RevenueCenterHeaderIcons = styled('span')`
  position: absolute;
  z-index: 1;
  top: 0.2rem;
  right: 0;
  width: 2rem;

  span + a {
    display: block;
    margin: 0.8rem 0 0;
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
  overflow: hidden;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-size: 1.5rem;
    font-weight: normal;
  }
`

const ChangeLocationView = styled('div')`
  margin: -0.75rem 0 0 -1.5rem;

  button {
    width: 100%;
    border: 0;
    font-size: 1.8rem;
  }
`

const ChangeLocation = ({ onClick }) => {
  return (
    <ChangeLocationView>
      <ButtonStyled
        icon={iconMap.RefreshCw}
        onClick={onClick}
        color="secondary"
        size="small"
      >
        Change location
      </ButtonStyled>
    </ChangeLocationView>
  )
}

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
  hasService,
  isLanding,
  type = null,
  style = null,
}) => {
  const theme = useTheme()
  const history = useHistory()
  const { address, images, hours, is_outpost, has_curbside } = revenueCenter
  const smallImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const largeImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const bgImage = smallImg.url || largeImg.url
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const hoursDesc = hours.description ? stripTags(hours.description) : null
  const hoursDescIcon = is_outpost ? iconMap.AlertCircle : iconMap.Clock
  const isActive = revenueCenter.revenue_center_id === activeMarker

  const makeActive = (evt) => {
    evt.target.blur()
    if (setActive) setActive(revenueCenter)
  }

  const orderNow = (evt) => {
    history.push('/locations')
  }

  return (
    <RevenueCenterContainer>
      <RevenueCenterHeaderIcons>
        {has_curbside && (
          <CurbsidePickup color={theme.colors.paprika} size="2rem" />
        )}
        <a
          href={revenueCenter.directions_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <DetourSign />
        </a>
      </RevenueCenterHeaderIcons>
      <RevenueCenterView
        style={style}
        as={type || (isActive ? 'span' : 'button')}
        onClick={isLanding ? orderNow : makeActive}
      >
        <RevenueCenterHeader>
          <PrefaceTitle as="h2">{revenueCenter.name}</PrefaceTitle>
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
        {activeMarker && (
          <>
            {hasService ? (
              <RevenueCenterOrder revenueCenter={revenueCenter} />
            ) : (
              <RevenueCentersAlert
                title="This location doesn't deliver to your address"
                subtitle="Please go back and choose a different location."
              />
            )}
            <ChangeLocation onClick={() => setActive(null)} />
          </>
        )}
      </RevenueCenterView>
    </RevenueCenterContainer>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  setActive: propTypes.func,
  activeMarker: propTypes.number,
  hasService: propTypes.bool,
  isLanding: propTypes.bool,
  type: propTypes.string,
  style: propTypes.object,
}

export default RevenueCenter
