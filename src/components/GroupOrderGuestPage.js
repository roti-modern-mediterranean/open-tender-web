import React, { useEffect, useCallback } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
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
import { CartGuestForm, Button } from '@open-tender/components'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import Loader from './Loader'
import GroupOrderError from './GroupOrderError'
import iconMap from './iconMap'

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
  if (error) {
    if (error.includes('does not exist')) {
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
    return {
      title: `Welcome to ${cartOwnerName}'s group order!`,
      subtitle: makeSubtitle(tz, requestedAt, cutoffAt),
    }
  }
}

const GroupOrderGuestPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams()
  const { groupOrders: config } = useSelector(selectConfig)
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
  const showForm = cartId && !error && !closed && !pastCutoff && !atCapacity

  const joinCart = useCallback(
    (data, callback) => dispatch(joinGroupOrder(data, callback)),
    [dispatch]
  )

  useEffect(() => {
    window.scroll(0, 0)
  }, [dispatch, cartGuestId])

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

  const startOver = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    dispatch(resetGroupOrder())
    dispatch(resetOrder())
    history.push('/')
  }

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        {isLoading ? (
          <Loader
            text="Retrieving group order info..."
            className="loading--left"
          />
        ) : (
          <>
            <PageTitle title={title} subtitle={subtitle} />
            <div className="content__body ot-line-height slide-up">
              <div className="container">
                <div className="content__text">
                  {showForm ? (
                    <>
                      <p>
                        {spotsRemaining && (
                          <span>Only {spotsRemaining} spots left! </span>
                        )}{' '}
                        {spendingLimit && (
                          <span>
                            There is a spending limit of ${spendingLimit} for
                            this order.
                          </span>
                        )}
                      </p>
                      <p>Please enter a first and last name to get started.</p>
                      <CartGuestForm
                        cartId={cartId}
                        joinCart={joinCart}
                        loading={loading}
                        error={error}
                      />
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
                      <Button
                        classes="ot-btn"
                        icon={iconMap['RefreshCw']}
                        text="Start A New Order"
                        onClick={startOver}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

GroupOrderGuestPage.displayName = 'GroupOrderGuestPage'
export default GroupOrderGuestPage
