import React from 'react'
import propTypes from 'prop-types'

const SectionHeader = ({ title, subtitle, children }) => (
  <div className="section__header">
    {title && <h2 className="section__title">{title}</h2>}
    {subtitle && <p className="section__subtitle">{subtitle}</p>}
    {children}
  </div>
)

SectionHeader.displayName = 'SectionHeader'
SectionHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
}

export default SectionHeader
