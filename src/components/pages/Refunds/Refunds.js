import React, { useContext, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

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

const Refunds = () => {
  const { title: siteTitle } = useSelector(selectBrand)
  const { refunds: config } = useSelector(selectConfig)
  const content =
    config.content && config.content.length > 0 ? config.content : []
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
  }, [windowRef])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : config.title} />
        <Main>
          <Container>
            <PageTitle {...config} />
            <PageContent>
              {content.map((i, index) => (
                <p key={index}>{i}</p>
              ))}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Refunds.displayName = 'Refunds'
export default Refunds
