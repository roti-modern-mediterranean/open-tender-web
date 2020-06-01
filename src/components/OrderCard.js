import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { isoToDateStr, timezoneMap } from '../packages/utils/datetimes'
import { Button } from '../packages'
import { capitalize } from '../packages/utils/helpers'
import { iconMap } from '../packages/icons'

const OrderImage = ({ imageUrl, title }) => {
  return (
    <div className="order__image border-radius-small ot-box-shadow">
      <img src={imageUrl} title={title} alt={title} />
    </div>
  )
}

const DeliveryLink = ({ streetAddress, trackingUrl }) => {
  return trackingUrl ? (
    <p>
      <a
        href={trackingUrl}
        rel="noopener noreferrer"
        target="_blank"
        title="Check delivery status"
      >
        {streetAddress}
        <span className="link-icon">{iconMap['ExternalLink']}</span>
      </a>
    </p>
  ) : (
    <p>{streetAddress}</p> || null
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
  } = order
  const tz = timezoneMap[timezone]
  const requestedAt = isoToDateStr(requested_at, tz, 'MMMM d @ h:mma')
  const isOpen = status === 'OPEN'
  const images = items.map((i) =>
    i.images
      .filter((m) => m.type === 'SMALL_IMAGE' && m.url)
      .map((image) => {
        return <OrderImage imageUrl={image.url} title={i.name} />
      })
  )
  const itemNames = items.map((i) => i.name).join(', ')
  const orderType = order_type === 'CATERING' ? order_type : service_type
  const { street, unit } = address || {}
  const streetAddress = `${street}${unit ? `, ${unit}` : ''}`
  const trackingUrl = isOpen && delivery && delivery.tracking_url

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
    <div className="order bg-color border-color border-radius ot-box-shadow">
      <div className="order__header">
        <p className="order__number preface font-size-x-small secondary-color">
          Order #{order_id}
        </p>
        <p className="order__title">
          {capitalize(orderType)} from {revenue_center.name}
        </p>
      </div>
      <div className="order__content">
        <div className="order__details font-size-small secondary-color">
          <p>
            {requestedAt} &nbsp;|&nbsp; ${order.total}
          </p>
          <DeliveryLink
            streetAddress={streetAddress}
            trackingUrl={trackingUrl}
          />
        </div>
        <div className="order__items">
          <div className="order__images">{images}</div>
          <p className="font-size-small secondary-color">{itemNames}</p>
        </div>
      </div>
      <div className="order__footer">
        <Button
          text="Reorder"
          icon="RefreshCw"
          onClick={handleReorder}
          classes="btn--small font-size-small"
        />
        <Button
          text="Details / Rate"
          icon="FileText"
          onClick={handleDetails}
          classes="btn--small btn--secondary font-size-small"
        />
      </div>
    </div>
  )
}

OrderCard.displayName = 'OrderCard'
OrderCard.propTypes = {
  order: propTypes.string,
}

export default OrderCard
