import React, { useContext, useEffect, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { handleRespError } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAPI, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import styled from '@emotion/styled'
import {
  Content,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  HeaderDefault,
} from '../..'

export const InternalPageContent = styled('div')`
  h4{
    font-weight: normal;
    font-size: 1.5em;
    margin: 0.5rem 0 1.25em 0;
    color: ${(props) => props.theme.colors.pepper };
    font-family: ${(props) => props.theme.fonts.preface.family};
  }
  p, ul{
    line-height: 1.5em;
    margin-bottom: 1.5em;
  }
  ul {
    margin-top: 2em;
  }
`

const Terms = () => {
  const { windowRef } = useContext(AppContext)
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)
  const { title: siteTitle } = useSelector(selectBrand)
  const api = useSelector(selectAPI)
  const slug = 'terms-conditions'
  const pageTitle = page ? page.title : 'Not Found'

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    let isCancelled = false
    const fetchPage = async () => {
      try {
        let page = await api.getPage(slug)
        if (!isCancelled) {
          setPage(page)
        }
      } catch (err) {
        if (!isCancelled) {
          let { detail } = handleRespError(err)
          if (detail.includes('does not exist')) {
            detail = 'Page not found. Please try again.'
          }
          setError(detail)
        }
      }
    }
    if (slug) fetchPage()
    return () => {
      isCancelled = true
    }
  }, [api, slug])

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault title={isBrowser ? null : pageTitle} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            {page ? (
              <>
                <PageTitle title={page.title} subtitle={page.subtitle} />
                <PageContent style={{ textAlign: 'left', marginTop: '3rem' }}>
                  <InternalPageContent>
                    <div dangerouslySetInnerHTML={{__html: page.content}}></div>
                  </InternalPageContent>
                </PageContent>
              </>
            ) : error ? (
              <>
                <PageTitle title="Something went wrong" />
                <PageContent style={{ textAlign: 'left', marginTop: '3rem' }}>
                  <p>{error}</p>
                </PageContent>
              </>
            ) : null}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Terms.displayName = 'Terms'
export default Terms
