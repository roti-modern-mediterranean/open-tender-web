import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  reopenGroupOrder,
  removeCustomerGroupOrder,
  selectMenuSlug,
  updateOrder,
} from '@open-tender/redux'
import {
  timezoneMap,
  isoToDateStr,
  // isoToDate,
  makeOrderAddress,
  makeOrderTypeName,
} from '@open-tender/js'
import { Button } from '@open-tender/components'

import iconMap from './iconMap'

const GroupOrderCard = ({ groupOrder, menuItems }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    cart_id,
    revenue_center: revenueCenter,
    service_type: serviceType,
    requested_at,
    address,
    guest_count,
    guest_limit,
    spending_limit,
  } = groupOrder
  const {
    revenue_center_type: orderType,
    timezone,
    is_outpost: isOutpost,
  } = revenueCenter
  const orderTypeName = makeOrderTypeName(orderType, serviceType)
  const tz = timezoneMap[timezone]
  const requestedAt =
    requested_at === 'asap'
      ? 'ASAP'
      : isoToDateStr(requested_at, tz, 'MMMM d, yyyy @ h:mma')
  const menuSlug = useSelector(selectMenuSlug)

  const handleDelete = (evt) => {
    evt.preventDefault()
    dispatch(removeCustomerGroupOrder(cart_id))
    evt.target.blur()
  }

  const handleReopen = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const data = { orderId: null, orderType, serviceType, isOutpost, address }
    dispatch(updateOrder(data))
    dispatch(reopenGroupOrder(groupOrder)).then(() => history.push(menuSlug))
  }

  return (
    <div className="order-card ot-bg-color-primary ot-border ot-border-radius ot-box-shadow slide-up">
      <div className="order-card__container">
        <div className="order-card__header">
          <p className="order-card__number ot-preface ot-font-size-x-small">
            {guest_count || 0} Guests
          </p>
          <p className="order-card__title ot-color-headings">
            {orderTypeName} from {revenueCenter.name}
          </p>
        </div>
        <div className="order-card__content">
          <div className="order-card__details ot-font-size-small">
            <p>{requestedAt}</p>
            {address && <p>{makeOrderAddress(address)}</p>}
            {guest_limit && <p>Guest limit: {guest_limit}</p>}
            {spending_limit && <p>Spending limit: ${spending_limit}</p>}
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
            <Button
              text="Reopen"
              icon={iconMap['RefreshCw']}
              onClick={handleReopen}
              classes="ot-btn--small ot-font-size-small"
            />
            <Button
              text="Delete"
              icon={iconMap['Trash2']}
              onClick={handleDelete}
              classes="ot-btn--small ot-btn--secondary ot-font-size-small"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

GroupOrderCard.displayName = 'GroupOrderCard'
GroupOrderCard.propTypes = {
  groupOrder: propTypes.object,
  menuItems: propTypes.array,
}

export default GroupOrderCard
