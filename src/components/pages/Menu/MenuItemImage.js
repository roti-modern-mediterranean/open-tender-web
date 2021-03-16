import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { BgImage, useImage } from '@open-tender/components'
import { ImageSpinner } from '../..'

const MenuItemImageView = styled('div')`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  // background-color: ${(props) =>
    props.theme.bgColors[props.isInverted ? 'primary' : 'secondary']};
`

const MenuItemImageLoading = styled('div')`
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

const MenuItemBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const MenuItemImage = ({ imageUrl, children }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError

  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <MenuItemImageView>
      {bgStyle && isLoading && (
        <MenuItemImageLoading>
          <ImageSpinner size={isBrowser ? 24 : 16} />
        </MenuItemImageLoading>
      )}
      {hasLoaded && (
        <MenuItemBackgroundImage style={bgStyle}>
          &nbsp;
        </MenuItemBackgroundImage>
      )}
      {children}
    </MenuItemImageView>
  )
}

MenuItemImage.displayName = 'MenuItemImage'
MenuItemImage.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default MenuItemImage
