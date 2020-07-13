import React from 'react'
import propTypes from 'prop-types'

const Tag = ({
  text,
  icon,
  bgClass = 'ot-bg-color-secondary',
  textClass = '',
}) => {
  return (
    <span className={`tag ot-preface ${bgClass}`}>
      <span className="tag__container">
        {icon && <span className={`tag__icon ${textClass}`}>{icon}</span>}
        <span className={`ot-font-size-x-small ${textClass}`}>{text}</span>
      </span>
    </span>
  )
}

Tag.displayName = 'Tag'
Tag.prototypes = {
  text: propTypes.string,
  icon: propTypes.string,
  bgClass: propTypes.string,
  textClass: propTypes.string,
}
export default Tag
