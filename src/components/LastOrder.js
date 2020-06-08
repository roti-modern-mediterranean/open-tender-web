import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import {
  timezoneMap,
  isoToDateStr,
  isoToDate,
} from '../packages/utils/datetimes'
import { capitalize, slugify } from '../packages/utils/helpers'
import { Button, DeliveryLink } from '../packages'
import OrderImage from './OrderImage'
import OrderTag from './OrderTag'
import { selectAccountConfigSections } from '../slices/configSlice'

const LastOrder = ({ order }) => {
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
  const { addresses: addressConfig } = useSelector(selectAccountConfigSections)
  const tz = timezoneMap[timezone]
  const requestedAt = isoToDateStr(requested_at, tz, 'MMMM d, yyyy @ h:mma')
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
  const orderType = order_type === 'OLO' ? service_type : order_type
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
    <div className="order-card bg-color border border-radius ot-box-shadow slide-up">
      <OrderTag isUpcoming={isUpcoming} status={status} />
      <div className="order-card__container">
        <div className="order-card__header">
          <p className="order-card__number preface font-size-x-small secondary-color">
            Your Last Order
          </p>
          <p className="order-card__title">
            {capitalize(orderType)} from {revenue_center.name}
          </p>
          {isOpen && trackingUrl && (
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
            <p>Your last address:</p>
            <p>{streetAddress}</p>
            <p>
              <Link
                activeClass="active"
                className="link-dark"
                to={slugify(addressConfig)}
                spy={true}
                smooth={true}
                offset={-90}
              >
                Choose a different address
              </Link>
            </p>
          </div>
          <div className="order-card__items">
            <div className="order-card__images">{images}</div>
            <p className="font-size-x-small secondary-color">{itemNames}</p>
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
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
    </div>
  )
}

LastOrder.displayName = 'LastOrder'
LastOrder.propTypes = {
  order: propTypes.object,
}

export default LastOrder
