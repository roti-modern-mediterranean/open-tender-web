import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useImage, BgImage } from '@open-tender/components'

import { BackgroundLoading } from '.'

const BackgroundImageView = styled('div')`
  position: relative;
  display: block;
  flex-grow: 1;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    overflow: hidden;
    border-radius: 1em;
    margin-left: 1em;
  }
`

const BackgroundImageImage = styled(BgImage)`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  background-size: ${(props) => props.backgroundSize || 'cover'};
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    background-size: cover;
  }
`

const BackgroundOverlay = styled('div')`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.color || 'rgba(0, 0, 0, 0.3)'};
  background: linear-gradient(
    0deg,
    ${(props) => props.color || 'rgba(0, 0, 0, 0.3)'} 7%,
    rgba(0, 0, 0, 0) 100%
  );
`

const makeOverlayColor = (color, opacity) => {
  if (!color || !opacity) return null
  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)
  const o = parseFloat(opacity / 100.0).toFixed(2)
  return `rgba(${r}, ${g}, ${b}, ${o})`
}

const BackgroundImage = ({
  imageUrl,
  show_overlay = false,
  overlay_color,
  overlay_opacity,
  style = {},
  children,
  background_size,
  slide_color,
  url,
}) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  if (!imageUrl) return null

  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const isLoading = !hasLoaded && !hasError
  // const isLoading = true
  const overlayColor = makeOverlayColor(overlay_color, overlay_opacity)
  if (slide_color) {
    style.backgroundColor = slide_color
  }
  return (
    <BackgroundImageView style={style} as={url ? 'a' : 'div'} href={url}>
      {isLoading ? (
        <BackgroundLoading />
      ) : (
        <>
          <BackgroundImageImage
            style={bgStyle}
            backgroundSize={background_size}
          />
          {show_overlay && <BackgroundOverlay color={overlayColor} />}
        </>
      )}
      {children}
    </BackgroundImageView>
  )
}

BackgroundImage.displayName = 'BackgroundImage'
BackgroundImage.propTypes = {
  imageUrl: propTypes.string,
  show_overlay: propTypes.bool,
  overlay_color: propTypes.string,
  overlay_opacity: propTypes.number,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default BackgroundImage
