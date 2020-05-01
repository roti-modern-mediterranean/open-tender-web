import React from 'react'

const Background = ({ imageUrl }) => {
  const bgStyle = { backgroundImage: `url(${imageUrl}` }
  return <div className="background bg-image" style={bgStyle}></div>
}

export default Background
