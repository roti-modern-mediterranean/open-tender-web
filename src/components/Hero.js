import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage } from '@open-tender/components'

const HeroView = styled(BgImage)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 32rem;
  padding: 5% ${(props) => props.theme.layout.padding};
  flex-grow: 1;
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 16rem;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 2.5rem;
  }

  // > div {
  //   opacity: 0;
  //   animation: slide-up 0.25s ease-in-out 0.125s forwards;
  // }
`

const HeroOverlay = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.color || 'rgba(0, 0, 0, 0.3)'};
`

const HeroChildren = styled('div')`
  position: relative;
  z-index: 2;
`

const makeOverlayColor = (color, opacity) => {
  if (!color || !opacity) return null
  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)
  const o = parseFloat(opacity / 100.0).toFixed(2)
  return `rgba(${r}, ${g}, ${b}, ${o})`
}

const makeAlignment = (alignment) => {
  switch (alignment) {
    case 'TOP':
    case 'LEFT':
      return 'flex-start'
    case 'BOTTOM':
    case 'RIGHT':
      return 'flex-end'
    default:
      return 'center'
  }
}

const Hero = ({
  imageUrl,
  vertical = 'BOTTOM',
  horizontal = 'CENTER',
  show_overlay = false,
  overlay_color,
  overlay_opacity,
  style = {},
  children,
}) => {
  const bgStyle = imageUrl
    ? { ...style, backgroundImage: `url(${imageUrl}` }
    : null
  const overlayColor = makeOverlayColor(overlay_color, overlay_opacity)
  const justifyContent = makeAlignment(horizontal)
  const alignItems = makeAlignment(vertical)
  return (
    <HeroView
      justifyContent={justifyContent}
      alignItems={alignItems}
      textAlign={horizontal}
      style={bgStyle}
    >
      {show_overlay && <HeroOverlay color={overlayColor} />}
      <HeroChildren>{children}</HeroChildren>
    </HeroView>
  )
}

Hero.displayName = 'Hero'
Hero.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Hero
