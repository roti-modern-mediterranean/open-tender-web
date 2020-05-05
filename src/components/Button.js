import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from '../utils/icons'

const Button = ({ text, icon, classes, ariaLabel, onClick, children }) => {
  return (
    <button
      type="button"
      className={`${icon ? 'btn' : ''} ${classes}`}
      aria-label={ariaLabel || text}
      onClick={onClick}
    >
      {icon ? (
        <span className="btn-icon-wrapper">
          <span className="btn-icon">{iconMap[icon]}</span>
          <span>{text}</span>
        </span>
      ) : text ? (
        text
      ) : (
        children
      )}
    </button>
  )
}

Button.displayName = 'Hero'
Button.propTypes = {
  text: propTypes.string,
  icon: propTypes.string,
  classes: propTypes.string,
  ariaLabel: propTypes.string,
  onClick: propTypes.func,
}

export default Button
