import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from 'open-tender'

const RevenueCenterAction = ({
  icon,
  iconClass = 'secondary-color',
  text,
  arrow = 'ArrowRight',
}) => {
  const iconArrow = arrow === null ? ' ' : iconMap[arrow]
  return (
    <div className="rc__action">
      <div className={`rc__icon ${iconClass}`}>{iconMap[icon]}</div>
      <div className="rc__text">
        <p className="secondary-color font-size-small">{text}</p>
      </div>
      <div className="rc__arrow secondary-color">{iconArrow}</div>
    </div>
  )
}

RevenueCenterAction.displayName = 'RevenueCenterAction'
RevenueCenterAction.propTypes = {
  icon: propTypes.string,
  iconClass: propTypes.string,
  text: propTypes.string,
  arrow: propTypes.string,
}

export default RevenueCenterAction
