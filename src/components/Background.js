import React from 'react'
import propTypes from 'prop-types'
import { ClipLoader } from 'react-spinners'

const Background = ({ imageUrl, classes = '', children }) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const className = `background bg-image ot-bg-color-secondary ${classes}`
  return (
    <div className={className} style={bgStyle}>
      {imageUrl && !bgStyle && (
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
