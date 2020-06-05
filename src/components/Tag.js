import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from '../packages/icons'

const Tag = ({
  text,
  icon,
  bgClass = 'bg-secondary-color',
  textClass = '',
}) => {
  return (
    <span className={`tag font-size-x-small ${bgClass} ${textClass}`}>
      <span className="tag__container">
        {icon && <span className="tag__icon">{iconMap[icon]}</span>}
        <span>{text}</span>
      </span>
    </span>
  )
}

Tag.displayName = 'Tag'
Tag.prototypes = {
  addresses: propTypes.array,
  token: propTypes.string,
  isLoading: propTypes.boolean,
}
export default Tag
