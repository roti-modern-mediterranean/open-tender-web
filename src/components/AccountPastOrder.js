import React from 'react'
import propTypes from 'prop-types'
import { isoToDateStr, timezoneMap } from '../packages/utils/datetimes'
import { Button } from '../packages'
import { capitalize } from '../packages/utils/helpers'

const OrderImage = ({ imageUrl, title }) => {
  return (
    <div className="order__image border-radius-small ot-box-shadow">
      <img src={imageUrl} title={title} alt={title} />
    </div>
  )
}

const AccountPastOrder = ({ order }) => {
  const {
    order_id,
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
  const images = items.map((i) =>
    i.images
      .filter((m) => m.type === 'SMALL_IMAGE' && m.url)
      .map((image) => {
        return <OrderImage imageUrl={image.url} title={i.name} />
      })
  )
  const itemNames = items.map((i) => i.name).join(', ')

  const orderType = order_type === 'CATERING' ? order_type : service_type

  const handleReorder = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  return (
    <div className="order bg-color border-color border-radius ot-box-shadow">
      <div className="order__header">
        <p className="order__number preface font-size-x-small secondary-color">
          Order #{order_id}
        </p>
        <p className="order__title">
          {/* <span className="preface">{orderType}</span> from
          <span className="preface">{revenue_center.name}</span> */}
          {capitalize(orderType)} from {revenue_center.name}
        </p>
      </div>
      <div className="order__content">
        <div className="order__details font-size-small secondary-color">
          <p>
            {requestedAt} &nbsp;|&nbsp; ${order.total}
          </p>
          {address && (
            <p>
              {address.street}
              {address.unit ? `, ${address.unit}` : ''}
            </p>
          )}
          {delivery && delivery.tracking_url && (
            <p>
              <a
                href={delivery.tracking_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Check Delivery Status
              </a>
            </p>
          )}
        </div>
        <div className="order__items">
          <div className="order__images">{images}</div>
          <p className="font-size-small secondary-color">{itemNames}</p>
        </div>
      </div>
      <div className="order__footer">
        <Button text="Reorder" icon="RefreshCw" onClick={handleReorder} />
      </div>
    </div>
  )
}

AccountPastOrder.displayName = 'AccountPastOrder'
AccountPastOrder.propTypes = {
  order: propTypes.string,
}

export default AccountPastOrder
