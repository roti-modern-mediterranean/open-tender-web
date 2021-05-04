import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectOrderRating,
  fetchOrderRating,
  updateOrderRating,
  unsubscribeOrderRating,
  resetOrderRating,
  selectCustomer,
} from '@open-tender/redux'
import { OrderRatingForm } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
} from '../..'
import iconMap from '../../iconMap'
import { FormHeader, FormWrapper } from '../../inputs'
import styled from '@emotion/styled'

const makePageTitles = (orderRating, isSubmitted, unsubscribe, isCancelled) => {
  if (unsubscribe) {
    return {
      title: "You've been unsubscribed",
      subtitle: 'You will not receive future order rating emails.',
    }
  } else if (isSubmitted) {
    return {
      title: 'Thanks for rating your order!',
      subtitle:
        'You can update your rating from your Order History if you need to make any adjustments.',
    }
  } else if (orderRating && orderRating.order_id) {
    return {
      title: `Almost done!`,
      subtitle: `Please verify your rating and (optionally) add any comments, and then click Submit.`,
    }
  } else if (isCancelled) {
    return {
      title: 'This order has been cancelled',
    }
  } else {
    return {
      title: "Sorry, but we couldn't find your order",
      subtitle: 'Please try clicking on the link in the email again',
    }
  }
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const RatingView = styled('div')`
  text-align: center;

  form > div > div:first-of-type {
    display: inline-block;
  }
`

const Rating = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const queryRating = query.get('rating')
  const unsubscribe = query.get('unsubscribe')
  const [submitted, setSubmitted] = useState(false)
  const { id: ratingUuid } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const { orderRating, loading, error } = useSelector(selectOrderRating)
  const { auth } = useSelector(selectCustomer)
  const errMsg = error ? error || error.message : null
  const isCancelled = errMsg && errMsg.includes('cancelled')
  const pageTitle = orderRating
    ? `Rating Order #${orderRating.order_id}`
    : 'Rating Not Found'
  const { windowRef } = useContext(AppContext)
  const isSubmitted = submitted && !error && loading !== 'pending'
  const pageTitles = makePageTitles(
    orderRating,
    isSubmitted,
    unsubscribe,
    isCancelled
  )
  const { title, subtitle } = pageTitles
  const adjustedRating =
    queryRating && !submitted
      ? { ...orderRating, rating: parseInt(queryRating) }
      : orderRating

  const updateRating = useCallback(
    (ratingUuid, data) => dispatch(updateOrderRating(ratingUuid, data)),
    [dispatch]
  )

  const callback = useCallback(() => setSubmitted(true), [setSubmitted])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (unsubscribe) {
      dispatch(unsubscribeOrderRating(ratingUuid))
    } else {
      dispatch(fetchOrderRating(ratingUuid))
    }
    return () => dispatch(resetOrderRating())
  }, [dispatch, ratingUuid, unsubscribe])

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <RatingView>
              <FormWrapper>
                {subtitle && <p>{subtitle}</p>}
                {loading === 'pending' ? (
                  <Loading text="Retrieving order rating..." />
                ) : submitted ? (
                  <p>
                    {auth ? (
                      <Link to="/">Head back to your account page</Link>
                    ) : (
                      <Link to="/">Head back to the home page</Link>
                    )}
                  </p>
                ) : orderRating ? (
                  <>
                    <FormHeader>
                      <h2>Rate Order #{orderRating.order_id}</h2>
                    </FormHeader>
                    <OrderRatingForm
                      orderId={ratingUuid}
                      orderRating={adjustedRating}
                      icon={iconMap.Star}
                      updateRating={updateRating}
                      callback={callback}
                    />
                  </>
                ) : null}
              </FormWrapper>
            </RatingView>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Rating.displayName = 'Rating'
export default Rating
