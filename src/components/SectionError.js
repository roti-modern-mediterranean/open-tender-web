import React from 'react'
import propTypes from 'prop-types'
import { isObject } from 'open-tender-js'

const SectionError = ({ error }) => {
  const errMsg = isObject(error) ? error.detail || error.message : error
  return error ? (
    <div className="section__error">
      <div className="section__error__message">
        <p className="ot-error-color">{errMsg}</p>
      </div>
    </div>
  ) : null
}

SectionError.displayName = 'SectionError'
SectionError.propTypes = {
  error: propTypes.oneOfType([propTypes.string, propTypes.object]),
}

export default SectionError
