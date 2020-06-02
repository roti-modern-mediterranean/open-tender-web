import React from 'react'
import propTypes from 'prop-types'
import {
  Button,
  CartItem,
  OrderQuantity,
  DeliveryLink,
  Check,
} from '../packages'
import { makeDisplayItem } from '../packages/utils/cart'
import { capitalize, isEmpty } from '../packages/utils/helpers'
import ClipLoader from 'react-spinners/ClipLoader'
import { timezoneMap, makeRequestedAtString } from '../packages/utils/datetimes'
import { iconMap } from '../packages/icons'

const OrderLoading = ({ loading }) => {
  return loading ? (
    <div className="order__header">
      <p className="preface">Retrieving your order...</p>
      <div className="order__loading">
        <div className="order__loading__loader">
          <ClipLoader size={24} loading={loading} />
        </div>
      </div>
    </div>
  ) : null
}

OrderLoading.displayName = 'OrderLoading'
OrderLoading.propTypes = {
  loading: propTypes.bool,
}

const handleOrderError = (error) => {
  switch (error.status) {
    case 404:
      return "We couldn't find this order. Please double check your order ID and give it another try."
    default:
      return error.detail || error.message
  }
}

const OrderError = ({ error, handler }) => {
  if (!error) return null
  const errMsg = handleOrderError(error)
  return (
    <div className="order__header">
      <p className="preface ot-error-color">Uh oh. Something went wrong.</p>
      <div className="order__error">
        <div className="order__error__message">
          <p className="ot-error-color ot-bold font-size-big">{errMsg}</p>
          <p className="font-size-small">
            <button type="button" className="btn-error" onClick={handler}>
              Click here to head back to your account page.
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

OrderError.displayName = 'OrderError'
OrderError.propTypes = {
  error: propTypes.string,
}

const OrderSectionItem = ({ title, children }) => (
  <div className="order__section__item border-color">
    <div className="order__section__item__label">
      <p className="order-card__number preface font-size-x-small secondary-color">
        {title}
      </p>
    </div>
    <div className="order__section__item__content">{children}</div>
  </div>
)

OrderSectionItem.displayName = 'OrderSectionItem'
OrderSectionItem.propTypes = {
  title: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

const OrderRevenueCenter = ({ revenue_center }) => {
  const { address: rcAddr } = revenue_center || {}
  return (
    <>
      <p>{revenue_center.name}</p>
      <p className="font-size-small secondary-color">
        {rcAddr.street}, {rcAddr.city}, {rcAddr.state} {rcAddr.postal_code}
      </p>
      <p className="font-size-small secondary-color">{rcAddr.phone}</p>
    </>
  )
}

OrderRevenueCenter.displayName = 'OrderRevenueCenter'
OrderRevenueCenter.propTypes = {
  revenue_center: propTypes.object,
}

const OrderRequestedAt = ({ requested_at, timezone, is_asap, status }) => {
  const tz = timezone && timezoneMap[timezone]
  const requestedAt =
    requested_at && makeRequestedAtString(requested_at, tz, true)
  return is_asap && status === 'OPEN' ? (
    <>
      <p>ASAP</p>
      <p className="font-size-small secondary-color">
        {requestedAt} (give or take a few minutes)
      </p>
    </>
  ) : (
    <p>{requestedAt}</p>
  )
}

OrderRequestedAt.displayName = 'OrderRequestedAt'
OrderRequestedAt.propTypes = {
  requested_at: propTypes.string,
  timezone: propTypes.string,
  is_asap: propTypes.bool,
  status: propTypes.string,
}

const OrderAddress = ({ address, delivery, status }) => {
  const { street, unit, city, state, postal_code, company, contact, phone } =
    address || {}
  const streetAddress = street ? `${street}${unit ? `, ${unit}` : ''}` : null
  const contactPhone =
    contact || phone ? [contact, phone].filter((i) => i).join(' @ ') : null
  const trackingUrl = status === 'OPEN' && delivery && delivery.tracking_url
  return (
    <>
      {company ? (
        <>
          <p>{company}</p>
          <p className="font-size-small secondary-color">{streetAddress}</p>
        </>
      ) : (
        <p>{streetAddress}</p>
      )}
      <p className="font-size-small secondary-color">
        {city}, {state} {postal_code}
      </p>
      {contactPhone && (
        <p className="font-size-small secondary-color">{contactPhone}</p>
      )}
      {trackingUrl && (
        <p className="font-size-small">
          <DeliveryLink
            text="Check delivery status"
            trackingUrl={trackingUrl}
          />
        </p>
      )}
    </>
  )
}

OrderAddress.displayName = 'OrderAddress'
OrderAddress.propTypes = {
  address: propTypes.object,
  delivery: propTypes.object,
  status: propTypes.string,
}

const OrderRating = ({ rating, comments }) => {
  const stars = []
  for (let i = 0; i < rating; i++) {
    stars.push(i)
  }
  return (
    <>
      <div className="order__stars">
        {stars.map((star) => (
          <span key={star}>{iconMap['Star']}</span>
        ))}
      </div>
      {comments.length ? (
        <p className="font-size-small secondary-color">{comments}</p>
      ) : null}
    </>
  )
}

const Order = ({
  order,
  loading,
  error,
  goToAccount,
  reorder,
  updateRating,
}) => {
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    is_asap,
    requested_at,
    timezone,
    delivery,
    address,
    notes,
    items,
    totals,
    rating,
  } = order || {}

  const isLoading = loading === 'pending'
  const showOrder = !isLoading && !error && !isEmpty(order)
  const displayedItems = items ? items.map((i) => makeDisplayItem(i)) : []
  const orderType = order_type === 'MAIN_MENU' ? service_type : order_type

  return (
    <div className="order">
      <OrderLoading loading={isLoading} />
      <OrderError error={error} handler={goToAccount} />
      {showOrder && (
        <>
          <div className="order__header">
            <p className="preface">Order #{order_id}</p>
            <h1>
              {capitalize(orderType)} from {revenue_center.name}
            </h1>
            <div className="order__buttons">
              <Button text="Reorder" icon="RefreshCw" onClick={reorder} />
              <Button
                text={rating ? 'Update Rating' : 'Add Rating'}
                icon="Star"
                onClick={updateRating}
              />
            </div>
            <p className="font-size-small">
              <button type="button" className="btn-link" onClick={goToAccount}>
                Head back to your account page
              </button>
            </p>
          </div>
          <div className="order__section">
            {/* <div className="order__section__title">
          <h2 className="ot-font-size-h3">Items</h2>
        </div> */}
            <div className="order__section__content bg-color border-radius">
              <div className="order__section__items">
                <OrderSectionItem title="Location">
                  <OrderRevenueCenter revenue_center={revenue_center} />
                </OrderSectionItem>
                <OrderSectionItem title="Requested Time">
                  <OrderRequestedAt
                    requested_at={requested_at}
                    timezone={timezone}
                    is_asap={is_asap}
                    status={status}
                  />
                </OrderSectionItem>
                {service_type === 'DELIVERY' && address && (
                  <OrderSectionItem title="Delivery Address">
                    <OrderAddress
                      address={address}
                      delivery={delivery}
                      status={status}
                    />
                  </OrderSectionItem>
                )}
                {notes && notes.length ? (
                  <OrderSectionItem title="Notes">
                    <p className="font-size-small secondary-color">{notes}</p>
                  </OrderSectionItem>
                ) : null}
                {rating ? (
                  <OrderSectionItem title="Rating">
                    <OrderRating {...rating} />
                  </OrderSectionItem>
                ) : null}
              </div>
            </div>
          </div>
          <div className="order__section">
            <div className="order__section__title">
              <h2 className="ot-font-size-h3">Items in Your Order</h2>
            </div>
            <div className="order__section__content bg-color border-radius">
              <ul className="cart">
                {displayedItems.map((item, index) => {
                  return (
                    <li key={`${item.id}-${index}`}>
                      <CartItem item={item} showModifiers={true}>
                        <OrderQuantity item={item} />
                      </CartItem>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="order__section">
            <div className="order__section__title">
              <h2 className="ot-font-size-h3">Your Receipt</h2>
            </div>
            <div className="order__section__content bg-color border-radius">
              <Check totals={totals} tenders={totals.tenders} />
            </div>
          </div>
          <div className="order__section">
            <div className="order__section__title">
              <p className="">
                <button
                  type="button"
                  className="btn-link"
                  onClick={goToAccount}
                >
                  Head back to your account page
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

Order.displayName = 'Order'
Order.propTypes = {
  order: propTypes.object,
  loading: propTypes.string,
  error: propTypes.string,
  goToAccount: propTypes.func,
}

export default Order
