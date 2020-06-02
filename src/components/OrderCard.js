import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
  isoToDateStr,
  timezoneMap,
  isoToDate,
} from '../packages/utils/datetimes'
import { Button } from '../packages'
import { capitalize } from '../packages/utils/helpers'
import { DeliveryLink } from '../packages'
import { iconMap } from '../packages/icons'

const OrderImage = ({ imageUrl, title }) => {
  return (
    <div className="order-card__image border-radius-small ot-box-shadow">
      <img src={imageUrl} title={title} alt={title} />
    </div>
  )
}

OrderImage.displayName = 'OrderImage'
OrderImage.propTypes = {
  imageUrl: propTypes.string,
  title: propTypes.string,
}

const OrderTag = ({ isUpcoming, status }) => {
  const tag = isUpcoming
    ? {
        class: '-upcoming bg-alert-color',
        text: 'Coming up',
        icon: 'AlertCircle',
      }
    : status === 'REFUNDED'
    ? { class: '-refunded bg-body-color', text: 'Refunded' }
    : {
        class: '-completed bg-success-color',
        text: 'Completed',
        icon: 'CheckCircle',
      }
  return (
    <div
      className={`order-card__tag preface ot-light-color font-size-x-small ${tag.class}`}
    >
      {tag.icon && (
        <span className="order-card__tag__icon">{iconMap[tag.icon]}</span>
      )}
      <span>{tag.text}</span>
    </div>
  )
}

const OrderCard = ({ order }) => {
  const history = useHistory()
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    requested_at,
    timezone,
    items,
    delivery,
    address,
    totals,
  } = order
  const tz = timezoneMap[timezone]
  const requestedAt = isoToDateStr(requested_at, tz, 'MMMM d @ h:mma')
  const isOpen = status === 'OPEN'
  const images = items.map((i) =>
    i.images
      .filter((m) => m.type === 'SMALL_IMAGE' && m.url)
      .map((image) => {
        return (
          <OrderImage key={image.url} imageUrl={image.url} title={i.name} />
        )
      })
  )
  const itemNames = items.map((i) => i.name).join(', ')
  const orderType = order_type === 'MAIN_MENU' ? service_type : order_type
  const { street, unit, city, state, postal_code } = address || {}
  const streetAddress = street
    ? `${street}${unit ? `, ${unit}` : ''}`
    : postal_code
    ? `${postal_code} ${city}, ${state}`
    : 'No address provided'
  const trackingUrl = isOpen && delivery && delivery.tracking_url
  const isUpcoming = isoToDate(requested_at) > new Date()

  const handleEdit = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const handleReorder = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const handleDetails = (evt) => {
    evt.preventDefault()
    history.push(`/orders/${order_id}`)
    evt.target.blur()
  }

  return (
    <div className="order-card bg-color border border-radius ot-box-shadow">
      <OrderTag isUpcoming={isUpcoming} status={status} />
      <div className="order-card__container">
        <div className="order-card__header">
          <p className="order-card__number preface font-size-x-small secondary-color">
            Order #{order_id}
          </p>
          <p className="order-card__title">
            {capitalize(orderType)} from {revenue_center.name}
          </p>
        </div>
        <div className="order-card__content">
          <div className="order-card__details font-size-small secondary-color">
            <p>
              {requestedAt} &nbsp;|&nbsp; ${totals.total}
            </p>
            {trackingUrl ? (
              <p>
                <DeliveryLink text={streetAddress} trackingUrl={trackingUrl} />
              </p>
            ) : (
              <p>{streetAddress}</p>
            )}
          </div>
          <div className="order-card__items">
            <div className="order-card__images">{images}</div>
            <p className="font-size-x-small secondary-color">{itemNames}</p>
          </div>
        </div>
        <div className="order-card__footer">
          {isUpcoming ? (
            <Button
              text="Edit"
              icon="Edit"
              onClick={handleEdit}
              classes="btn--small font-size-small"
              disabled={!order.is_editable}
            />
          ) : (
            <Button
              text="Reorder"
              icon="RefreshCw"
              onClick={handleReorder}
              classes="btn--small font-size-small"
            />
          )}
          <Button
            text={`Details ${!isUpcoming ? '/ Rate' : ''}`}
            icon="FileText"
            onClick={handleDetails}
            classes="btn--small btn--secondary font-size-small"
          />
        </div>
      </div>
    </div>
  )
}

OrderCard.displayName = 'OrderCard'
OrderCard.propTypes = {
  order: propTypes.object,
}

export default OrderCard
