import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  reopenGroupOrder,
  removeCustomerGroupOrder,
  selectMenuSlug,
  updateOrder,
} from '@open-tender/redux'
import { timezoneMap, isoToDateStr, makeOrderAddress } from '@open-tender/js'

import { Card, CardButton } from '.'

const OrderCardGroup = ({ order }) => {
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    order_id,
    cart_id,
    revenue_center: revenueCenter,
    service_type: serviceType,
    order_type,
    requested_at,
    address,
    guest_count,
    guest_limit,
    spending_limit,
    cart,
    totals,
  } = order
  const {
    revenue_center_type: orderType,
    timezone,
    is_outpost: isOutpost,
  } = revenueCenter
  const tz = timezoneMap[timezone]
  const requestedAt =
    requested_at === 'asap'
      ? 'ASAP'
      : isoToDateStr(requested_at, tz, 'MMMM d, yyyy @ h:mma')
  const menuSlug = useSelector(selectMenuSlug)
  const items = cart
    .map((i) =>
      i.images
        .filter((m) => m.type === 'SMALL_IMAGE' && m.url)
        .map((image) => ({ ...i, imageUrl: image.url }))
    )
    .flat()
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    .reverse()
  const imageUrl = items && items.length ? items[0].imageUrl : null

  const handleDelete = () => {
    dispatch(removeCustomerGroupOrder(cart_id))
  }

  const handleReopen = () => {
    const data = { orderId: null, orderType, serviceType, isOutpost, address }
    dispatch(updateOrder(data))
    dispatch(reopenGroupOrder(order)).then(() => setOpen(true))
  }

  useEffect(() => {
    if (open && menuSlug && menuSlug !== '/') {
      setOpen(false)
      history.push(menuSlug)
    }
  }, [open, menuSlug, history])

  return (
    <Card
      id={order_id}
      isOlo={order_type === 'OLO'}
      imageUrl={imageUrl}
      preface={
        <>
          <span>{requestedAt}</span>
          <span>${totals.total}</span>
        </>
      }
      title={`Group Order from ${revenueCenter.name}`}
      description={
        <>
          {address && <p>{makeOrderAddress(address)}</p>}
          {guest_count || 0} Guests
          {guest_limit && <p>Guest limit: {guest_limit}</p>}
          {spending_limit && <p>Spending limit: ${spending_limit}</p>}
        </>
      }
      view={(props) => (
        <CardButton {...props} onClick={handleDelete}>
          Delete
        </CardButton>
      )}
      add={(props) => (
        <CardButton {...props} onClick={handleReopen}>
          Edit
        </CardButton>
      )}
    />
  )
}

OrderCardGroup.displayName = 'OrderCardGroup'
OrderCardGroup.propTypes = {
  order: propTypes.object,
}

export default OrderCardGroup
