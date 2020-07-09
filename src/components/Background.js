import React from 'react'
import { ClipLoader } from 'react-spinners'

const Background = ({ imageUrl }) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <div className="background bg-image ot-bg-color-secondary" style={bgStyle}>
      {!bgStyle && (
        <div className="map__loading">
          <ClipLoader size={30} loading={true} />
        </div>
      )}
    </div>
  )
}

export default Background
