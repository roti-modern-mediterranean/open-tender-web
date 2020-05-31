import React from 'react'
import propTypes from 'prop-types'

const SectionItem = ({ children }) => (
  <div className="section__item">
    <div className="section__item__content">{children}</div>
  </div>
)

SectionItem.displayName = 'SectionItem'
SectionItem.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default SectionItem
