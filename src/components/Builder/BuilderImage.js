import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'

const BuilderImageView = styled('div')`
  position: relative;
  top: -10rem;
  z-index: 2;
  width: 100%;
  height: 54rem;
  // @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
  //   top: -2rem;
  //   height: 44rem;
  // }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    top: -2rem;
    height: 44rem;
    margin: 0 0 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: -2rem;
    height: 32rem;
    margin: 0;
  }
`

const BuilderImageLoading = styled('div')`
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
  width: 100%;
  height: 100%;
  background-size: auto 100%;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const BuilderImage = ({ imageUrl, spinner, children }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  return (
    <BuilderImageView>
      {spinner && isLoading && (
        <BuilderImageLoading>{spinner}</BuilderImageLoading>
      )}
      {hasLoaded && (
        <BuilderBackgroundImage style={bgStyle}>&nbsp;</BuilderBackgroundImage>
      )}
      {children}
    </BuilderImageView>
  )
}

BuilderImage.displayName = 'BuilderImage'
BuilderImage.propTypes = {
  imageUrl: propTypes.string,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default BuilderImage
