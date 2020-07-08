import React from 'react'
import propTypes from 'prop-types'

const Hero = ({ imageUrl, classes = '', children }) => {
  const bgStyle = { backgroundImage: `url(${imageUrl}` }
  classes = `hero bg-image ${classes}`
  return (
    <div className={classes} style={bgStyle}>
      {children}
    </div>
  )
}

Hero.displayName = 'Hero'
Hero.propTypes = {
  imageUrl: propTypes.string,
  classes: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Hero
