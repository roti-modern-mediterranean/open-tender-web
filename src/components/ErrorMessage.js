import React from 'react'
import propTypes from 'prop-types'

const ErrorMessage = ({ title, msg, children }) => (
  <div className="error-message ot-color-error ot-bg-color-error ot-border-radius">
    {title && title.length ? (
      <p className="error-message__title ot-heading ot-font-size-h3 ot-color-error">
        {title}
      </p>
    ) : null}
    <div className="error-message__content">
      <p className="ot-font-size-small">{msg}</p>
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
