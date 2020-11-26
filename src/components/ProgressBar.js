import React from 'react'
import propTypes from 'prop-types'

const ProgressBar = ({ progress }) => {
  const style = { width: `${progress}%` }
  return (
    <div className="progress ot-bg-color-secondary ot-box-shadow-inset ot-border-color">
      <div className="progress__bar" style={style}>
        <div className="progress__fill ot-box-shadow ot-highlight"></div>
      </div>
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'
ProgressBar.propTypes = {
  progress: propTypes.number,
}

export default ProgressBar
