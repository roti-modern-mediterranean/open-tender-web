import React from 'react'
import propTypes from 'prop-types'

const CircleLoader = ({ complete }) => {
  const classes = `circle-loader ${complete ? 'load-complete' : ''}`
  return (
    <div className={classes}>
      <div className="checkmark draw"></div>
    </div>
  )
}

CircleLoader.displayName = 'CircleLoader'
CircleLoader.propTypes = {
  complete: propTypes.bool,
}

export default CircleLoader
