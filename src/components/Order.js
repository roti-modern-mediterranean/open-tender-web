import React from 'react'
import propTypes from 'prop-types'
import { CartItem } from '../packages'
import { makeDisplayItem } from '../packages/utils/cart'
import OrderQuantity from '../packages/OrderQuantity'
import { capitalize } from '../packages/utils/helpers'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  isoToDateStr,
  timezoneMap,
  makeRequestedAtString,
} from '../packages/utils/datetimes'

const OrderLoading = ({ loading }) => {
  return loading ? (
    <div className="order__loading">
      <div className="order__loading__loader">
        <ClipLoader size={30} loading={loading} />
      </div>
    </div>
  ) : null
}

OrderLoading.displayName = 'OrderLoading'
OrderLoading.propTypes = {
  loading: propTypes.bool,
}

const OrderError = ({ error }) => {
  return error ? (
    <div className="order__error">
      <div className="order__error__message">
        <p className="ot-error-color">{error}</p>
      </div>
    </div>
  ) : null
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

const Order = ({ order, loading, error }) => {
  console.log(order)
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    is_asap,
    requested_at,
    timezone,
    items,
    delivery,
    address,
  } = order || {}

  const isLoading = loading === 'pending'
  const showOrder = !isLoading && !error
  const displayedItems = items ? items.map((i) => makeDisplayItem(i)) : []
  const orderType = order_type === 'MAIN_MENU' ? service_type : order_type
  const { address: rcAddr } = revenue_center || {}
  const tz = timezone && timezoneMap[timezone]
  const requestedAt =
    requested_at && makeRequestedAtString(requested_at, tz, true)
  console.log(displayedItems)

  return (
    <div className="order">
      <OrderLoading loading={isLoading} />
      <OrderError error={error} />
      {showOrder && (
        <>
          <div className="order__header">
            <p className="preface">Order #{order_id}</p>
            <h1>
              {capitalize(orderType)} from {revenue_center.name}
            </h1>
          </div>
          <div className="order__section">
            {/* <div className="order__section__title">
          <h2 className="ot-font-size-h3">Items</h2>
        </div> */}
            <div className="order__section__content bg-color border-radius">
              <div className="order__section__items">
                <OrderSectionItem title="Location">
                  <p>{revenue_center.name}</p>
                  <p className="font-size-small secondary-color">
                    {rcAddr.street}, {rcAddr.city}, {rcAddr.state}{' '}
                    {rcAddr.postal_code}
                  </p>
                  <p className="font-size-small secondary-color">
                    {rcAddr.phone}
                  </p>
                </OrderSectionItem>
                <OrderSectionItem title="Requested Time">
                  {true ? (
                    <>
                      <p>ASAP</p>
                      <p className="font-size-small secondary-color">
                        {requestedAt}
                      </p>
                    </>
                  ) : (
                    <p>{requestedAt}</p>
                  )}
                </OrderSectionItem>
              </div>
            </div>
          </div>
          <div className="order__section">
            <div className="order__section__title">
              <h2 className="ot-font-size-h3">Items</h2>
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
        </>
      )}
    </div>
  )
}

Order.displayName = 'Order'
Order.propTypes = {
  order: propTypes.object,
  loading: propTypes.bool,
  error: propTypes.string,
}
export default Order
