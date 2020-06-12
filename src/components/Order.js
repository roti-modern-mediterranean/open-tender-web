import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CartItem, OrderQuantity, Check } from '../packages'
import { makeDisplayItem } from '../packages/utils/cart'
import { capitalize, isEmpty } from '../packages/utils/helpers'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  timezoneMap,
  makeRequestedAtString,
  isoToDate,
} from '../packages/utils/datetimes'
import { iconMap } from '../packages/icons'
import SectionHeader from './SectionHeader'
import SectionRow from './SectionRow'
import OrderAddress from './OrderAddress'
import {
  selectToken,
  addCustomerFavorite,
  removeCustomerFavorite,
  selectCustomerFavorites,
} from '../slices/customerSlice'
import {
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
} from '../slices/orderSlice'

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

OrderRating.displayName = 'OrderRating'
OrderRating.propTypes = {
  rating: propTypes.number,
  comments: propTypes.string,
}

const Order = ({ order, loading, error, goToAccount }) => {
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
    cart,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
    tenders,
    rating,
  } = order || {}
  const dispatch = useDispatch()
  const isLoading = loading === 'pending'
  const showOrder = !isLoading && !error && !isEmpty(order)
  const orderType = order_type === 'OLO' ? service_type : order_type
  const isUpcoming = isoToDate(requested_at) > new Date()
  const displayedItems = cart ? cart.map((i) => makeDisplayItem(i)) : []
  const token = useSelector(selectToken)
  const { lookup } = useSelector(selectCustomerFavorites)
  const check = { surcharges, discounts, taxes, totals, details }

  const addFavorite = (cart) => {
    const data = { cart }
    dispatch(addCustomerFavorite({ token, data }))
  }

  const removeFavorite = (favoriteId) => {
    dispatch(removeCustomerFavorite({ token, favoriteId }))
  }

  const editOrder = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const updateRating = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const reorder = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const { location_id: locationId } = revenue_center
    const serviceType = service_type
    dispatch(setOrderServiceType([order_type, service_type]))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ locationId, serviceType, cart }))
  }

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
              {order.is_editable && (
                <Button text="Edit" icon="Edit" onClick={editOrder} />
              )}
              <Button text="Reorder" icon="RefreshCw" onClick={reorder} />
              {!isUpcoming && (
                <Button
                  text={rating ? 'Update Rating' : 'Add Rating'}
                  icon="Star"
                  onClick={updateRating}
                />
              )}
            </div>
            <p className="font-size-small">
              <button type="button" className="btn-link" onClick={goToAccount}>
                Head back to your account page
              </button>
            </p>
          </div>
          <div className="section container">
            <div className="section__container">
              {/* <SectionHeader title={title} subtitle={subtitle} /> */}
              <div className="section__content bg-color border-radius">
                <div className="section__rows">
                  <SectionRow title="Location">
                    <OrderRevenueCenter revenue_center={revenue_center} />
                  </SectionRow>
                  <SectionRow title="Requested Time">
                    <OrderRequestedAt
                      requested_at={requested_at}
                      timezone={timezone}
                      is_asap={is_asap}
                      status={status}
                    />
                  </SectionRow>
                  {service_type === 'DELIVERY' && address && (
                    <SectionRow title="Delivery Address">
                      <OrderAddress
                        address={address}
                        delivery={delivery}
                        status={status}
                      />
                    </SectionRow>
                  )}
                  {notes && notes.length ? (
                    <SectionRow title="Notes">
                      <p className="font-size-small secondary-color">{notes}</p>
                    </SectionRow>
                  ) : null}
                  {rating ? (
                    <SectionRow title="Rating">
                      <OrderRating {...rating} />
                    </SectionRow>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="section container">
            <div className="section__container">
              <SectionHeader title="Items in Your Order" />
              <div className="section__content bg-color border-radius">
                <ul className="cart">
                  {displayedItems.map((item, index) => {
                    const favoriteId = lookup[item.signature] || null
                    return (
                      <li key={`${item.id}-${index}`}>
                        <CartItem item={item} showModifiers={true}>
                          <OrderQuantity
                            item={item}
                            favoriteId={favoriteId}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                          />
                        </CartItem>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="section container">
            <div className="section__container">
              <SectionHeader title="Your Receipt" />
              <div className="section__content bg-color border-radius">
                <Check check={check} tenders={tenders} />
              </div>
            </div>
          </div>
          <div className="section container">
            <div className="section__container">
              <SectionHeader>
                <p>
                  <button
                    type="button"
                    className="btn-link"
                    onClick={goToAccount}
                  >
                    Head back to your account page
                  </button>
                </p>
              </SectionHeader>
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
