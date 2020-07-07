import React from 'react'
import propTypes from 'prop-types'

const SectionRow = ({ title, children }) => (
  <div className="section__row border-color">
    <div className="section__row__label">
      <p className="ot-preface ot-font-size-x-small ot-color-secondary">
        {title}
      </p>
    </div>
    <div className="section__row__content">{children}</div>
  </div>
)

SectionRow.displayName = 'SectionRow'
SectionRow.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default SectionRow
