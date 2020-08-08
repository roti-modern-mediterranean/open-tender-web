import React, { useEffect, useCallback } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { isoToDate, makeReadableDateStrFromIso } from '@open-tender/js'
import {
  fetchGroupOrder,
  selectGroupOrder,
  // resetGroupOrder,
  selectRevenueCenter,
  selectTimezone,
  joinGroupOrder,
} from '@open-tender/redux'
import { CartGuestForm } from '@open-tender/components'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import Loader from './Loader'
import GroupOrderInfo from './GroupOrderInfo'
import GroupOrderError from './GroupOrderError'

const makeTitle = (isLoading, error, closed, pastCutoff, cartOwnerName) => {
  if (isLoading) return {}
  if (error) {
    return {
      title: 'Group Order Not Found',
      subtitle: "Sorry, but we couldn't find the group order you requested",
    }
  } else if (closed) {
    return {
      title: 'Group Order Closed',
      subtitle: 'Sorry, but this group order has already been closed',
    }
  } else if (pastCutoff) {
    return {
      title: 'Order cutoff time has passed',
      subtitle: 'Sorry, but this group order is no longer open to new guests',
    }
  } else {
    return {
      title: `Welcome to ${cartOwnerName}'s group order!`,
      subtitle: null,
    }
  }
}

const GroupOrderGuestPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams()
  const config = useSelector(selectConfig)
  const groupOrder = useSelector(selectGroupOrder)
  const revenueCenter = useSelector(selectRevenueCenter)
  const { slug } = revenueCenter || {}
  const tz = useSelector(selectTimezone)
  const {
    cartOwnerName,
    cartGuest,
    cartId,
    closed,
    loading,
    error,
    cutoffAt,
    requestedAt,
    spendingLimit,
    guestLimit,
    guestCount,
  } = groupOrder
  const isLoading = loading === 'pending'
  const { cartGuestId } = cartGuest || {}
  const orderTime =
    requestedAt && tz ? makeReadableDateStrFromIso(requestedAt, tz, true) : null
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz, true) : null
  const cutoffDate = cutoffAt ? isoToDate(cutoffAt, tz) : null
  const pastCutoff = cutoffDate ? new Date() > cutoffDate : false
  const spotsRemaining = guestLimit ? guestLimit - guestCount : null
  const atCapacity = spotsRemaining !== null && spotsRemaining <= 0
  const { title, subtitle } = makeTitle(
    isLoading,
    error,
    closed,
    pastCutoff,
    cartOwnerName
  )
  const showForm = cartId && !closed && !pastCutoff && !atCapacity

  const joinCart = useCallback(
    (data, callback) => dispatch(joinGroupOrder(data, callback)),
    [dispatch]
  )

  useEffect(() => {
    window.scroll(0, 0)
    // return () => {
    //   if (!cartGuestId) dispatch(resetGroupOrder())
    // }
  }, [dispatch, cartGuestId])

  useEffect(() => {
    if (cartGuestId) {
      if (slug) history.push(`/menu/${slug}`)
    } else {
      dispatch(fetchGroupOrder(token))
    }
  }, [dispatch, history, token, cartGuestId, slug])

  return (
    <>
      {isBrowser && <Background imageUrl={config.refunds.background} />}
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
                  <GroupOrderError
                    cartId={cartId}
                    error={error}
                    closed={closed}
                    pastCutoff={pastCutoff}
                    atCapacity={atCapacity}
                    cartOwnerName={cartOwnerName}
                  />
                  {showForm && (
                    <>
                      <GroupOrderInfo
                        orderTime={orderTime}
                        cutoffTime={cutoffTime}
                        spendingLimit={spendingLimit}
                        spotsRemaining={spotsRemaining}
                      />
                      <CartGuestForm
                        cartId={cartId}
                        joinCart={joinCart}
                        loading={loading}
                        error={error}
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
