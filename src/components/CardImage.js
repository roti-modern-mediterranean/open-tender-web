import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { BgImage, useImage } from '@open-tender/components'
import { ImageSpinner } from '.'

const CardImageView = styled('div')`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  // background-color: ${(props) =>
    props.theme.bgColors[props.isInverted ? 'primary' : 'secondary']};
`

const CardImageLoading = styled('div')`
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

const CardImageBackground = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

// TODO: remove this
const placeholder = {
  backgroundImage:
    'url(//s3.amazonaws.com/betterboh/u/img/local/46/1616277717_chicken-kabob-bowl-top-down_02_400x400.png)',
}

const CardImage = ({ imageUrl, children }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  return (
    <CardImageView>
      {bgStyle && isLoading && (
        <CardImageLoading>
          <ImageSpinner size={isBrowser ? 24 : 16} />
        </CardImageLoading>
      )}
      {hasError && (
        <CardImageBackground style={placeholder}>&nbsp;</CardImageBackground>
      )}
      {hasLoaded && (
        <CardImageBackground style={bgStyle}>&nbsp;</CardImageBackground>
      )}
      {children}
    </CardImageView>
  )
}

CardImage.displayName = 'CardImage'
CardImage.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CardImage
