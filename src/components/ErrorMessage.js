import React from 'react'
import propTypes from 'prop-types'

const ErrorMessage = ({ title, msg, children }) => (
  <div className="error-message ot-error border-radius">
    <p className="error-message__title heading ot-font-size-h3 ot-error-color">
      {title}
    </p>
    <div className="error-message__content">
      <p className="font-size-small">{msg}</p>
    </div>
    {children}
  </div>
)

ErrorMessage.displayName = 'ErrorMessage'
ErrorMessage.propTypes = {
  title: propTypes.string,
  msg: propTypes.string,
  textClass: propTypes.string,
}

export default ErrorMessage
