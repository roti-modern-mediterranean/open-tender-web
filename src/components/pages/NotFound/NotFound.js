import React, { useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectToken } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
} from '../..'

const NotFound = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { notFound: config } = useSelector(selectConfig)
  const token = useSelector(selectToken)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (token) return history.push('/account')
  }, [token, history])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : config.title} />
        <Main>
          <Container>
            <PageTitle {...config} />
            <PageContent>
              <Link to="/">{config.back}</Link>
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

NotFound.displayName = 'NotFound'
export default NotFound
