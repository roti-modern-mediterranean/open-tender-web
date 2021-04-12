import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'

const BuilderOptionImageView = styled('div')`
  position: relative;
  flex: 0 0 10rem;
  height: 10rem;
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: contain;
  background-position: center top;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
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
