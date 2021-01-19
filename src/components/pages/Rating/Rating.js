import React, { useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import {
  selectOrderRating,
  fetchOrderRating,
  updateOrderRating,
} from '@open-tender/redux'
import { Message, OrderRatingForm } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Container,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageTitle,
  PageContent,
  Background,
} from '../..'
import iconMap from '../../iconMap'

const makePageTitles = (orderRating) => {
  if (orderRating && orderRating.order_id) {
    return {
      title: `Thanks for rating order #${orderRating.order_id}!`,
      subtitle: 'Please add your rating and any comments (optionally) below',
    }
  } else {
    return {
      title: "Sorry, but we couldn't find your order",
      subtitle: 'Please try clicking on the link in the email again',
    }
  }
}

const Rating = () => {
  const dispatch = useDispatch()
  const { id: ratingUuid } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { orderRating, loading, error } = useSelector(selectOrderRating)
  const errMsg = error ? error.message || null : null
  const title = orderRating
    ? `Rating #${orderRating.order_id}`
    : 'Rating Not Found'
  const { windowRef } = useContext(AppContext)
  const pageTitles = makePageTitles(orderRating)

  const updateRating = useCallback(
    (ratingUuid, data) => dispatch(updateOrderRating(ratingUuid, data)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    dispatch(fetchOrderRating(ratingUuid))
  }, [dispatch, ratingUuid])

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={accountConfig.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : 'Curbside Pickup'} />
        <Main>
          <Container>
            <PageTitle {...pageTitles} />
            <PageContent>
              {loading === 'pending' ? (
                <Loading text="Retrieving order rating..." />
              ) : errMsg ? (
                <Message color="error" style={{ width: '100%' }}>
                  {errMsg}
                </Message>
              ) : orderRating ? (
                <OrderRatingForm
                  orderId={ratingUuid}
                  orderRating={orderRating}
                  icon={iconMap.Star}
                  updateRating={updateRating}
                />
              ) : null}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Rating.displayName = 'Rating'
export default Rating
