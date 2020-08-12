import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectGroupOrder } from '@open-tender/redux'

import GroupOrderReviewGuest from './GroupOrderReviewGuest'
import GroupOrderReviewOwner from './GroupOrderReviewOwner'

const GroupOrderReviewPage = () => {
  const history = useHistory()
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartOwner, cartGuest } = groupOrder

  useEffect(() => {
    window.scroll(0, 0)
    if (!cartId) history.push(`/`)
  }, [cartId, history])

  return cartGuest ? (
    <GroupOrderReviewGuest />
  ) : cartOwner ? (
    <GroupOrderReviewOwner />
  ) : null
}

GroupOrderReviewPage.displayName = 'GroupOrderReviewPage'
export default GroupOrderReviewPage
