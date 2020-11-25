import React from 'react'
import propTypes from 'prop-types'

const Hero = ({ imageUrl, classes = '', children, overlay = false }) => {
  const bgStyle = { backgroundImage: `url(${imageUrl}` }
  classes = `hero bg-image ${classes}`
  return (
    <div className={classes} style={bgStyle}>
      {overlay && <div className="hero__overlay ot-opacity-dark" />}
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
