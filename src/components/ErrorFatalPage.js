import React, { useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import * as Sentry from '@sentry/react'
import { useSelector, useDispatch } from 'react-redux'

import {
  incrementRetries,
  selectConfigRetries,
  fetchConfig,
} from '../slices/configSlice'
import Loader from './Loader'

const ErrorFatalPage = ({ error, loading }) => {
  const dispatch = useDispatch()
  const retries = useSelector(selectConfigRetries)
  const { status, title, detail, message } = error || {}
  const errMsg = detail || message || JSON.stringify(error)
  const is500 = Number.isInteger(status) && status >= 500
  const isLoading = loading === 'pending'
  const isRetrying = is500 && retries < 5
  const showLoading = isLoading || isRetrying
  const memoizedError = useMemo(() => error, [error])

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (is500 && retries < 5) {
        setTimeout(() => {
          dispatch(fetchConfig())
          dispatch(incrementRetries())
        }, 1000 * (retries + 1))
      } else if (memoizedError) {
        Sentry.withScope((scope) => {
          scope.setExtras(memoizedError)
          const errType = is500 ? '500' : 'Fatal'
          const err = new Error(`${errType} Error - ${errMsg}`)
          Sentry.captureException(err)
        })
      }
    }
  }, [errMsg, memoizedError, isLoading, is500, retries, dispatch])

  return showLoading ? (
    <Loader className="loading--page" type="Clip" size={32} />
  ) : error ? (
    <div className="fatal-error">
      <div className="fatal-error__body">
        <h1 className="fatal-error__title">Unknown Error</h1>
        <div className="fatal-error__content">
          <p>
            We're really sorry about this, but our development team has already
            been alerted about this issue.
          </p>
          <p>
            <strong>Please try refreshing the page.</strong>
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
            {errMsg}
          </pre>
        </div>
      </div>
    </div>
  ) : null
}

ErrorFatalPage.displayName = 'ErrorFatalPage'
ErrorFatalPage.propTypes = {
  error: propTypes.object,
  loading: propTypes.string,
}
export default ErrorFatalPage
