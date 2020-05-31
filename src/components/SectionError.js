import React from 'react'
import propTypes from 'prop-types'

const SectionError = ({ error }) => {
  return error ? (
    <div className="section__error">
      <div className="section__error__message">
        <p className="ot-error-color">{error}</p>
      </div>
    </div>
  ) : null
}

SectionError.displayName = 'SectionError'
SectionError.propTypes = {
  error: propTypes.string,
}

export default SectionError
