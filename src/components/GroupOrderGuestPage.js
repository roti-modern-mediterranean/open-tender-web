import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeReadableDateStrFromIso } from '@open-tender/js'
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

const makeTitle = (isLoading, error, closed, cartOwnerName) => {
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
  } else {
    return {
      title: `Welcome to ${cartOwnerName}'s group order!`,
      subtitle: 'Please enter a first and last name to get started',
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
  } = groupOrder
  const isLoading = loading === 'pending'
  const { title, subtitle } = makeTitle(isLoading, error, closed, cartOwnerName)
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz) : null
  const orderTime =
    requestedAt && tz ? makeReadableDateStrFromIso(requestedAt, tz) : null

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
                  ) : closed ? (
                    <p>
                      Please get in touch with {cartOwnerName} to see if it's
                      not too late to reopen it.
                    </p>
                  ) : (
                    <>
                      <p>{orderTime}</p>
                      <p>{cutoffTime}</p>
                      <p>Cart guest form will go here...</p>
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
