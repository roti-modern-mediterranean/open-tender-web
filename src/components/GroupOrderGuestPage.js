import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isoToDate, makeReadableDateStrFromIso } from '@open-tender/js'
import {
  fetchGroupOrder,
  selectGroupOrder,
  resetGroupOrder,
  // selectRevenueCenter,
  selectTimezone,
} from '@open-tender/redux'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import { Loader } from 'react-feather'

const makeTitle = (
  isLoading,
  error,
  closed,
  pastCutoff,
  spotsRemaining,
  cartOwnerName
) => {
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
  const { token } = useParams()
  const config = useSelector(selectConfig)
  const groupOrder = useSelector(selectGroupOrder)
  // const revenueCenter = useSelector(selectRevenueCenter)
  const tz = useSelector(selectTimezone)
  const {
    cartOwnerName,
    cartGuestId,
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
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz) : null
  const orderTime =
    requestedAt && tz ? makeReadableDateStrFromIso(requestedAt, tz) : null
  const cutoffDate = isoToDate(cutoffAt, tz)
  const pastCutoff = new Date() > cutoffDate
  const spotsRemaining = guestLimit ? guestLimit - guestCount : null
  const { title, subtitle } = makeTitle(
    isLoading,
    error,
    closed,
    pastCutoff,
    spotsRemaining,
    cartOwnerName
  )

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(fetchGroupOrder(token))
    return () => {
      if (!cartGuestId) dispatch(resetGroupOrder())
    }
  }, [dispatch, token, cartGuestId])

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
                  {error ? (
                    <p>
                      Please double check the link you were provided to make
                      sure it's accurate.
                    </p>
                  ) : closed || pastCutoff ? (
                    <p>
                      Please get in touch with {cartOwnerName} to see if it's
                      not too late to reopen it.
                    </p>
                  ) : (
                    <>
                      <p>
                        This order is current scheduled for {orderTime}, and{' '}
                        <span className="">
                          orders must be submitted by {cutoffTime}
                        </span>
                        .
                      </p>
                      {spendingLimit && (
                        <p>
                          There is a spending limit of ${spendingLimit} for this
                          order.
                        </p>
                      )}
                      <p>
                        {spotsRemaining && (
                          <span className="">
                            Only {spotsRemaining} spots left!{' '}
                          </span>
                        )}{' '}
                        Please enter a first and last name to get started.
                      </p>
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
