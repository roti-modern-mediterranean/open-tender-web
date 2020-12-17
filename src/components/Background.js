import React from 'react'
import propTypes from 'prop-types'
import { ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'

const BackgroundContainer = styled('div')`
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 76.8rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const Background = ({ imageUrl, children }) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <BackgroundContainer style={bgStyle}>
      {imageUrl && !bgStyle && (
        <div className="map__loading">
          <ClipLoader size={30} loading={true} />
        </div>
      )}
      {children}
    </BackgroundContainer>
  )
}

Background.displayName = 'Background'
Background.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Background
