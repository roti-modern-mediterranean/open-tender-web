import React, { useEffect, useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { isoToDate, makeReadableDateStrFromIso } from '@open-tender/js'
import {
  fetchGroupOrder,
  selectGroupOrder,
  resetGroupOrder,
  resetOrder,
  fetchRevenueCenter,
  selectRevenueCenter,
  selectTimezone,
  joinGroupOrder,
  selectCustomer,
  logoutCustomer,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import iconMap from '../../iconMap'
import {
  CheckoutHeader,
  Content,
  HeaderContent,
  Loading,
  Main,
  PageContainer,
} from '../..'
import { CartGuestForm } from '../../forms'
import { FormWrapper } from '../../inputs'
import GroupOrderError from './GroupOrderError'

const formatTime = (time) => {
  return time
    ? time.replace('Today', 'today').replace('Tomorrow', 'tomorrow')
    : ''
}

const makeSubtitle = (tz, requestedAt, cutoffAt) => {
  const orderTime =
    requestedAt !== 'asap'
      ? requestedAt && tz
        ? makeReadableDateStrFromIso(requestedAt, tz, true)
        : null
      : requestedAt
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz, true) : null
  if (orderTime === 'asap') {
    return 'This order is scheduled for ASAP and will be closed by the cart owner when all orders have been submitted.'
  } else {
    let subtitle = `This order is current scheduled for ${formatTime(
      orderTime
    )}`
    subtitle += cutoffTime
      ? `, and orders must be submitted by ${formatTime(cutoffTime)}.`
      : '.'
    return subtitle
  }
}

const makeTitle = (
  isLoading,
  error,
  closed,
  pastCutoff,
  cartOwnerName,
  tz,
  requestedAt,
  cutoffAt,
  atCapacity
) => {
  if (isLoading) return {}
  const defaultTitle = {
    title: `Welcome to ${cartOwnerName}'s group order!`,
    subtitle: makeSubtitle(tz, requestedAt, cutoffAt),
  }
  if (error) {
    if (error.includes('The parameters of your request were invalid.')) {
      return defaultTitle
    } else if (error.includes('does not exist')) {
      return {
        title: 'Group order not found',
        subtitle:
          'Please double check the link you were sent and contact the group owner if necessary.',
      }
    }
    return { title: 'Group order closed', subtitle: error }
  } else if (closed) {
    return {
      title: 'Group order closed',
      subtitle: 'Sorry, but this group order has already been closed.',
    }
  } else if (pastCutoff) {
    return {
      title: 'Order cutoff time has passed',
      subtitle: 'Sorry, but this group order is no longer open to new guests.',
    }
  } else if (atCapacity) {
    return {
      title: 'Group order oversubscribed',
      subtitle:
        'Sorry, but the guest limit has already been reached for this group order.',
    }
  } else {
    return defaultTitle
  }
}

const GroupOrderGuestIntro = styled('div')`
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }

  p {
    margin: 1em 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const GroupOrderGuest = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const groupOrder = useSelector(selectGroupOrder)
  const {
    revenueCenterId,
    isCartOwner,
    cartOwner,
    cartGuest,
    cartId,
    closed,
    loading,
    error,
    requestedAt,
    cutoffAt,
    spendingLimit,
    guestLimit,
    guestCount,
    token: currentToken,
  } = groupOrder
  const isLoading = loading === 'pending'
  const cartOwnerName = cartOwner
    ? `${cartOwner.first_name} ${cartOwner.last_name}`
    : ''
  const { cartGuestId } = cartGuest || {}
  const revenueCenter = useSelector(selectRevenueCenter)
  const { slug } = revenueCenter || {}
  const tz = useSelector(selectTimezone)
  const { profile } = useSelector(selectCustomer)
  const cutoffDate = cutoffAt ? isoToDate(cutoffAt, tz) : null
  const pastCutoff = cutoffDate ? new Date() > cutoffDate : false
  const spotsRemaining = guestLimit ? guestLimit - guestCount : null
  const atCapacity = spotsRemaining !== null && spotsRemaining <= 0
  const { title, subtitle } = makeTitle(
    isLoading,
    error,
    closed,
    pastCutoff,
    cartOwnerName,
    tz,
    requestedAt,
    cutoffAt,
    atCapacity
  )
  const errMsg =
    error && error.includes('The parameters of your request were invalid.')
      ? 'Both a first name and last name are required'
      : null
  const showForm =
    (cartId && !error && !closed && !pastCutoff && !atCapacity) || errMsg

  const joinCart = useCallback(
    (data, callback) => dispatch(joinGroupOrder(data, callback)),
    [dispatch]
  )

  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (isCartOwner) {
      history.push(`/menu/${slug}`)
    } else if (cartGuestId && currentToken === token) {
      if (slug) history.push(`/menu/${slug}`)
    } else if (currentToken !== token) {
      if (profile) dispatch(logoutCustomer())
      dispatch(resetGroupOrder())
      dispatch(fetchGroupOrder(token))
    }
  }, [
    dispatch,
    history,
    token,
    currentToken,
    cartGuestId,
    slug,
    isCartOwner,
    profile,
  ])

  useEffect(() => {
    if (revenueCenterId) dispatch(fetchRevenueCenter(revenueCenterId))
  }, [dispatch, revenueCenterId])

  const startOver = () => {
    dispatch(resetGroupOrder())
    dispatch(resetOrder())
    history.push('/')
  }

  return (
    <>
      <Helmet>
        <title>Join Group Order | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderContent />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {subtitle && <p>{subtitle}</p>}
              <GroupOrderGuestIntro>
                {isLoading ? (
                  <Loading text="Retrieving group order info..." />
                ) : showForm ? (
                  <>
                    <p>
                      {spotsRemaining && (
                        <span>Only {spotsRemaining} spots left! </span>
                      )}{' '}
                      {spendingLimit && (
                        <span>
                          There is a spending limit of ${spendingLimit} for this
                          order.
                        </span>
                      )}
                      Please enter a first and last name to get started.
                    </p>
                  </>
                ) : (
                  <>
                    <GroupOrderError
                      cartId={cartId}
                      error={error}
                      closed={closed}
                      pastCutoff={pastCutoff}
                      atCapacity={atCapacity}
                      cartOwnerName={cartOwnerName}
                    />
                    <p>
                      <ButtonStyled
                        icon={iconMap.RefreshCw}
                        onClick={startOver}
                      >
                        Start A New Order
                      </ButtonStyled>
                    </p>
                  </>
                )}
              </GroupOrderGuestIntro>
              {showForm && !isLoading && (
                <CartGuestForm
                  cartId={cartId}
                  joinCart={joinCart}
                  loading={loading}
                  errMsg={errMsg}
                />
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

GroupOrderGuest.displayName = 'GroupOrderGuest'
export default GroupOrderGuest
