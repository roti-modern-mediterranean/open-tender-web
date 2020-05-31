import React from 'react'
import propTypes from 'prop-types'

const SectionHeader = ({ title, subtitle }) => (
  <div className="section__header">
    <h2 className="section__title">{title}</h2>
    <p className="section__subtitle">{subtitle}</p>
  </div>
)

SectionHeader.displayName = 'SectionHeader'
SectionHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
}

export default SectionHeader
