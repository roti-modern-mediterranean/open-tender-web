import React, { useContext, useEffect, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { handleRespError } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAPI, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  HeaderDefault,
} from '../..'

const Location = () => {
  const { windowRef } = useContext(AppContext)
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)
  const { title: siteTitle } = useSelector(selectBrand)
  const api = useSelector(selectAPI)
  const slug = 'location'
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
                  <p>Page content goes here</p>
                </PageContent>
              </>
            ) : error ? (
              <>
                <PageTitle title="Location not found" />
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

Location.displayName = 'Location'
export default Location
