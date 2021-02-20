import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage } from '@open-tender/components'

const HeroView = styled(BgImage)`
  position: relative;
  width: 100%;
  height: 32rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 18rem;
  }

  > div {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.125s forwards;
  }
`

const Hero = ({ imageUrl, children }) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return <HeroView style={bgStyle}>{children}</HeroView>
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
