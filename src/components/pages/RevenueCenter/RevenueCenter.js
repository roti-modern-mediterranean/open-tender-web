import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectOrder,
  fetchRevenueCenter,
  resetOrderType,
  setOrderServiceType,
} from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import {
  selectBrand,
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
} from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
  RevenueCenter as RevenueCenterCard,
  ScreenreaderTitle,
} from '../..'
import styled from '@emotion/styled'
import { FormWrapper } from '../../inputs'

// const makeImageUrl = (images, defaultImageUrl) => {
//   if (!images) return defaultImageUrl || null
//   const largeImage = images
//     ? images.find((i) => i.type === 'LARGE_IMAGE')
//     : null
//   let imageUrl = largeImage ? largeImage.url : null
//   return imageUrl || defaultImageUrl || null
// }

const RevenueCenterView = styled('div')`
  padding: 1.5rem 2rem 2rem;
  margin: 0 0 1rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const RevenueCenter = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { geoLatLng, geoError } = useGeolocation()
  const { title: siteTitle } = useSelector(selectBrand)
  const { revenueCenters: config } = useSelector(selectConfig)
  const order = useSelector(selectOrder)
  const { revenueCenter, loading } = order
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)
  const title = revenueCenter ? revenueCenter.name : config.title

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(setGeoLoading())
    dispatch(resetOrderType())
    dispatch(fetchRevenueCenter(slug))
  }, [dispatch, slug, windowRef])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  useEffect(() => {
    if (revenueCenter) {
      const { settings, revenue_center_type } = revenueCenter
      const { service_types } = settings
      let serviceType = service_types.length
        ? service_types.includes('PICKUP')
          ? 'PICKUP'
          : 'DELIVERY'
        : null
      if (serviceType) {
        dispatch(setOrderServiceType(revenue_center_type, serviceType))
      }
    }
  }, [revenueCenter, dispatch])

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <ScreenreaderTitle>{title}</ScreenreaderTitle>
            {/* <CheckoutHeader title={title} /> */}
            <FormWrapper>
              {isLoading ? (
                <Loading text="Retrieving location..." />
              ) : revenueCenter ? (
                <RevenueCenterView>
                  <RevenueCenterCard
                    revenueCenter={revenueCenter}
                    isLanding={true}
                  />
                </RevenueCenterView>
              ) : (
                <p>
                  Location not found. Please try a different URL or{' '}
                  <Link to="/">head back to our home page</Link>.
                </p>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
export default RevenueCenter
