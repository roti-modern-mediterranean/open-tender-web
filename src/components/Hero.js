import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage } from '@open-tender/components'

const HeroView = styled(BgImage)`
  position: relative;
  width: 100%;
  height: 32rem;
  padding: ${(props) => props.theme.layout.padding};
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 16rem;
    padding: ${(props) => props.theme.layout.paddingMobile};
  }

  > div {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.125s forwards;
  }
`

const HeroOverlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

const makeAlignment = (alignment) => {
  switch (alignment) {
    case 'top':
    case 'left':
      return 'flex-start'
    case 'bottom':
    case 'right':
      return 'flex-end'
    default:
      return 'center'
  }
}

const Hero = ({
  imageUrl,
  vertical = 'bottom',
  horizontal = 'center',
  overlay = false,
  children,
}) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const justifyContent = makeAlignment(horizontal)
  const alignItems = makeAlignment(vertical)
  return (
    <HeroView
      justifyContent={justifyContent}
      alignItems={alignItems}
      textAlign={horizontal}
      style={bgStyle}
    >
      {overlay && <HeroOverlay />}
      {children}
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
