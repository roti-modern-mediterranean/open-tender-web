import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { timezoneMap, isoToDateStr, isoToDate } from 'open-tender-js'
import { capitalize } from 'open-tender-js'
import { makeOrderAddress } from 'open-tender-js'
import { Button, DeliveryLink } from 'open-tender'
import {
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
  editOrder,
} from '../slices/orderSlice'
import OrderImages from './OrderImages'
import OrderTag from './OrderTag'

const OrderCard = ({ order, isLast }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    requested_at,
    timezone,
    cart,
    address,
    totals,
    delivery,
  } = order
  const isOpen = status === 'OPEN'
  const orderType = order_type === 'OLO' ? service_type : order_type
  const tz = timezoneMap[timezone]
  const requestedAt = isoToDateStr(requested_at, tz, 'MMMM d, yyyy @ h:mma')
  const isUpcoming = isoToDate(requested_at) > new Date()
  const streetAddress = makeOrderAddress(address)
  const trackingUrl = isOpen && delivery && delivery.tracking_url
  const itemNames = cart.map((i) => i.name).join(', ')

  const handleEdit = (evt) => {
    evt.preventDefault()
    dispatch(editOrder(order))
    evt.target.blur()
  }

  const handleReorder = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const { revenue_center_id: revenueCenterId } = revenue_center
    const serviceType = service_type
    dispatch(setOrderServiceType([order_type, service_type]))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ revenueCenterId, serviceType, items: cart }))
  }

  const handleDetails = (evt) => {
    evt.preventDefault()
    history.push(`/orders/${order_id}`)
    evt.target.blur()
  }

  return (
    <div className="order-card bg-color border border-radius ot-box-shadow slide-up">
      <OrderTag isUpcoming={isUpcoming} status={status} />
      <div className="order-card__container">
        <div className="order-card__header">
          <p className="order-card__number preface font-size-x-small secondary-color">
            {isLast ? 'Your Last Order' : `Order #${order_id}`}
          </p>
          <p className="order-card__title">
            {capitalize(orderType)} from {revenue_center.name}
          </p>
          {isUpcoming && trackingUrl && (
            <p className="font-size-small secondary-color">
              <DeliveryLink
                text="Track your delivery"
                trackingUrl={trackingUrl}
              />
            </p>
          )}
        </div>
        <div className="order-card__content">
          <div className="order-card__details font-size-small secondary-color">
            <p>
              {requestedAt} &nbsp;|&nbsp; ${totals.total}
            </p>
            <p>{streetAddress}</p>
          </div>
          <div className="order-card__items">
            <div className="order-card__images">
              <OrderImages items={cart} />
            </div>
            <p className="font-size-x-small secondary-color">{itemNames}</p>
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
            {order.is_editable && (
              <Button
                text="Edit"
                icon="Edit"
                onClick={handleEdit}
                classes="btn--small font-size-small"
              />
            )}
            <Button
              text="Reorder"
              icon="RefreshCw"
              onClick={handleReorder}
              classes={`btn--small font-size-small ${
                order.is_editable ? 'btn--secondary' : ''
              }`}
            />
            <Button
              text={`Details ${!isUpcoming ? '/ Rate' : ''}`}
              icon="FileText"
              onClick={handleDetails}
              classes="btn--small btn--secondary font-size-small"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

OrderCard.displayName = 'OrderCard'
OrderCard.propTypes = {
  order: propTypes.object,
  isLast: propTypes.bool,
}

export default OrderCard
