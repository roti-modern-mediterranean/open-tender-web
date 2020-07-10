import React from 'react'
import propTypes from 'prop-types'

const SectionFooter = ({ children }) => (
  <div className="section__footer">
    <p className="ot-font-size">{children}</p>
  </div>
)

SectionFooter.displayName = 'SectionFooter'
SectionFooter.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default SectionFooter
