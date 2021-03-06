import React from 'react'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'
import { useImage } from '@open-tender/components'
import { useSelector } from 'react-redux'
import { selectTheme } from '../slices'
import { makeSlides } from './HeroSlides'
import { Slider } from '.'

const BackgroundContainer = styled('div')`
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 76.8rem;
  display: flex;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }

  & > div {
    p:first-of-type {
      @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
        font-size: ${(props) => props.theme.fonts.sizes.xBig};
      }
    }

    p + p {
      @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
        font-size: ${(props) => props.theme.fonts.sizes.small};
      }
    }
  }
`

const BackgroundLoading = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Background = ({ imageUrl, announcements }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const theme = useSelector(selectTheme)
  if (!isBrowser) return null
  if (!imageUrl && !announcements) return null

  const { settings, entities, loading, error } = announcements || {}
  const slides = makeSlides(entities)
  const isLoading = loading === 'pending'
  const hasAnnouncements = entities && entities.length > 0
  const showBackground = imageUrl && !isLoading && (!hasAnnouncements || error)
  const backgroundLoading = showBackground && !hasLoaded && !hasError
  const loaderColor = theme.bgColors.primary
  const bgStyle =
    showBackground && imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  return (
    <BackgroundContainer style={bgStyle}>
      {slides ? (
        <Slider settings={settings} slides={slides} />
      ) : backgroundLoading ? (
        <BackgroundLoading>
          <ClipLoader size={30} loading={true} color={`${loaderColor}`} />
        </BackgroundLoading>
      ) : null}
    </BackgroundContainer>
  )
}

Background.displayName = 'Background'
Background.propTypes = {
  imageUrl: propTypes.string,
  announcements: propTypes.object,
  // children: propTypes.oneOfType([
  //   propTypes.arrayOf(propTypes.node),
  //   propTypes.node,
  // ]),
}

export default Background
