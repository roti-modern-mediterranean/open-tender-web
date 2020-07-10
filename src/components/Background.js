import React from 'react'
import propTypes from 'prop-types'
import { ClipLoader } from 'react-spinners'

const Background = ({ imageUrl, children }) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <div className="background bg-image ot-bg-color-secondary" style={bgStyle}>
      {!bgStyle && (
        <div className="map__loading">
          <ClipLoader size={30} loading={true} />
        </div>
      )}
      {children}
    </div>
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
