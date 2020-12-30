import React, { useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as Sentry from '@sentry/react'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { resetOrderType, resetCheckout } from '@open-tender/redux'
import { ButtonStyled, ButtonLink } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import iconMap from '../../iconMap'
import {
  Background,
  Container,
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderMobile,
  HeaderLogo,
} from '../..'
import styled from '@emotion/styled'

const ErrorReportView = styled('div')`
  margin: 4rem 0 0;
`

const ErrorReportDetails = styled('div')`
  margin: 4rem 0 0;
  padding: 2rem;
  overflow-x: scroll;
  color: ${(props) => props.theme.colors.error};
  background-color: ${(props) => props.theme.bgColors.error};
  border-radius: ${(props) => props.theme.border.radius};

  pre {
    margin: 0;
    font-family: Consolas, Menlo, Courier, monospace;
    line-height: 1.8;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const ErrorReport = ({ error, errorInfo, eventId }) => {
  const dispatch = useDispatch()
  const { error: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  const handleReset = () => {
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    window.location.replace('/')
  }

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem" hasRouter={false}>
        <HeaderMobile
          maxWidth="76.8rem"
          borderColor="primary"
          left={<HeaderLogo />}
          // right={<Account color="light" />}
        />
        <Main>
          <Container>
            <PageTitle {...config} />
            <PageContent>
              <p>
                <ButtonStyled icon={iconMap.RefreshCw} onClick={handleReset}>
                  Start Over
                </ButtonStyled>
              </p>
              <ErrorReportView>
                {eventId && (
                  <p>
                    <ButtonLink
                      onClick={() => Sentry.showReportDialog({ eventId })}
                    >
                      Click here to report this issue
                    </ButtonLink>
                  </p>
                )}
                <ErrorReportDetails>
                  <pre>
                    {error.toString()}
                    {errorInfo && errorInfo.componentStack.toString()}
                  </pre>
                </ErrorReportDetails>
              </ErrorReportView>
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

ErrorReport.displayName = 'ErrorReport'
ErrorReport.propTypes = {
  error: propTypes.object,
  errorInfo: propTypes.object,
  eventId: propTypes.string,
}
export default ErrorReport
