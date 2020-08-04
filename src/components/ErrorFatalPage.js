import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import * as Sentry from '@sentry/react'

const ErrorFatalPage = ({ error }) => {
  const { title, detail } = error || {}

  useEffect(() => {
    window.scroll(0, 0)
    Sentry.captureException(new Error(`Fatal Error: ${detail}`))
  }, [detail])

  return (
    <div className="fatal-error">
      <div className="fatal-error__body">
        <h1 className="fatal-error__title">Fatal Error</h1>
        <div className="fatal-error__content">
          <p>
            We're really sorry about this, but our development team has already
            been alerted about this issue.
          </p>
          <p>
            <strong>
              Please try refreshing the page - this will most likely solve the
              problem.
            </strong>
          </p>
          <p>
            If the issue persists, please contact Open Tender support at{' '}
            <a
              className="no-link"
              href="mailto:help@opentender.io"
              rel="noopener noreferrer"
            >
              help@opentender.io
            </a>{' '}
            and provide the details of the error message below.
          </p>
          <pre>
            <h2>{title}</h2>
            {detail}
          </pre>
        </div>
      </div>
    </div>
  )
}

ErrorFatalPage.displayName = 'ErrorFatalPage'
ErrorFatalPage.propTypes = {
  error: propTypes.object,
}
export default ErrorFatalPage
