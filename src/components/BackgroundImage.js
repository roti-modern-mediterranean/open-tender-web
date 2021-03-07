import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useImage, BgImage } from '@open-tender/components'

import { BackgroundLoading } from '.'

const BackgroundImageView = styled('div')`
  position: relative;
  flex-grow: 1;
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const BackgroundImageImage = styled(BgImage)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const BackgroundImage = ({ imageUrl }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  if (!imageUrl) return null

  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const isLoading = !hasLoaded && !hasError
  // const isLoading = true

  return (
    <BackgroundImageView>
      {isLoading ? (
        <BackgroundLoading />
      ) : (
        <BackgroundImageImage style={bgStyle} />
      )}
    </BackgroundImageView>
  )
}

BackgroundImage.displayName = 'BackgroundImage'
BackgroundImage.propTypes = {
  imageUrl: propTypes.string,
}

export default BackgroundImage
