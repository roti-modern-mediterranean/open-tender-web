import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as Sentry from '@sentry/react'
import { isBrowser } from 'react-device-detect'
import { resetOrderType, resetCheckout } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import iconMap from './iconMap'
import Footer from './Footer'
import HeaderLogo from './HeaderLogo'

const ErrorPage = ({ error, errorInfo, eventId }) => {
  const config = useSelector(selectConfig)
  const dispatch = useDispatch()
  const className = isBrowser ? `header` : `header ot-dark`

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const handleReset = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    window.location.replace('/')
    evt.target.blur()
  }

  return (
    <div className="app">
      <header className={className}>
        <div className="container">
          <div className="header__container">
            <div className="header__nav">
              <div className="header__logo">
                <HeaderLogo />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="main main--error ot-bg-color-primary">
        {isBrowser && <Background imageUrl={config.error.background} />}
        <div className="content">
          <PageTitle {...config.error} />
          <div className="content__body">
            <div className="container">
              <div className="error-page__body">
                <p>
                  <Button
                    text="Click here to reset your order and give it another try"
                    onClick={handleReset}
                    classes="ot-btn-link"
                  />
                </p>
                {eventId && (
                  <p>
                    <Button
                      text="Report This Issue"
                      icon={iconMap['AlertCircle']}
                      classes="ot-btn ot-btn--cancel"
                      onClick={() => Sentry.showReportDialog({ eventId })}
                    />
                  </p>
                )}
              </div>
              <div className="error-page__error ot-bg-color-error ot-color-error">
                <pre className="ot-font-size-small">
                  {error.toString()}
                  {errorInfo && errorInfo.componentStack.toString()}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <Footer hasRouter={false} />
      </main>
    </div>
  )
}

ErrorPage.displayName = 'ErrorPage'
ErrorPage.propTypes = {
  error: propTypes.object,
  errorInfo: propTypes.object,
  eventId: propTypes.string,
}
export default ErrorPage
