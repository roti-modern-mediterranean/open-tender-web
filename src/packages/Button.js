import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from './icons'

const Button = ({
  text,
  icon,
  classes,
  ariaLabel,
  onClick,
  disabled,
  children,
}) => {
  const btnIcon = typeof icon === 'string' ? iconMap[icon] : icon
  return (
    <button
      type="button"
      className={`${btnIcon ? 'btn' : ''} ${classes}`}
      aria-label={ariaLabel || text}
      onClick={onClick}
      disabled={disabled}
    >
      {btnIcon ? (
        <span className="btn-icon-wrapper">
          <span className="btn-icon">{btnIcon}</span>
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
  icon: propTypes.oneOf([propTypes.string, propTypes.element]),
  classes: propTypes.string,
  ariaLabel: propTypes.string,
  onClick: propTypes.func,
}

export default Button
