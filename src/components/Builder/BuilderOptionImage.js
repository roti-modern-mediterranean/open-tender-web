import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'

const BuilderOptionImageView = styled('div')`
  position: relative;
  width: 100%;
  padding: 50% 0;
  border-radius: 1.4rem;
  background-color: ${(props) => props.theme.bgColors.light};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    border-radius: 0;
    background-color: transparent;
  }
`

const BuilderOptionImageLoading = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BuilderBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background-size: contain;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const BuilderOptionImage = ({ imageUrl, spinner, children }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  return (
    <BuilderOptionImageView>
      {spinner && isLoading && (
        <BuilderOptionImageLoading>{spinner}</BuilderOptionImageLoading>
      )}
      {hasLoaded && (
        <BuilderBackgroundImage style={bgStyle}>&nbsp;</BuilderBackgroundImage>
      )}
      {children}
    </BuilderOptionImageView>
  )
}

BuilderOptionImage.displayName = 'BuilderOptionImage'
BuilderOptionImage.propTypes = {
  imageUrl: propTypes.string,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default BuilderOptionImage
