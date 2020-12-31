import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectGroupOrder } from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import GroupOrderReviewGuest from './GroupOrderReviewGuest'
import GroupOrderReviewOwner from './GroupOrderReviewOwner'

const GroupOrderReview = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartOwner, cartGuest } = groupOrder
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
    if (!cartId) history.push(`/`)
  }, [windowRef, cartId, history])

  return (
    <>
      <Helmet>
        <title>Review Group Order | {siteTitle}</title>
      </Helmet>
      {cartGuest ? (
        <GroupOrderReviewGuest />
      ) : cartOwner ? (
        <GroupOrderReviewOwner />
      ) : null}
    </>
  )
}

GroupOrderReview.displayName = 'GroupOrderReview'
export default GroupOrderReview
