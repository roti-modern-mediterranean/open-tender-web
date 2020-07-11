import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  addCustomerFavorite,
  removeCustomerFavorite,
  selectCustomerFavorites,
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
  editOrder,
  resetCustomerOrder,
} from '@open-tender/redux'
import {
  makeDisplayItem,
  capitalize,
  isEmpty,
  isoToDate,
} from '@open-tender/js'
import { Button, CartItem, OrderQuantity, Check } from '@open-tender/components'

import { openModal } from '../slices'
import SectionHeader from './SectionHeader'
import SectionRow from './SectionRow'
import OrderAddress from './OrderAddress'
import OrderRating from './OrderRating'
import OrderRequestedAt from './OrderRequestedAt'
import OrderRevenueCenter from './OrderRevenueCenter'
import OrderError from './OrderError'
import SectionFooter from './SectionFooter'
import Loader from './Loader'

const Order = ({ order, loading, error }) => {
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
  const history = useHistory()
  const isLoading = loading === 'pending'
  const showOrder = !isLoading && !error && !isEmpty(order)
  const orderType = order_type === 'OLO' ? service_type : order_type
  const isUpcoming = isoToDate(requested_at) > new Date()
  const displayedItems = cart ? cart.map((i) => makeDisplayItem(i)) : []
  const { auth } = useSelector(selectCustomer)
  const { lookup = {} } = useSelector(selectCustomerFavorites)
  const check = { surcharges, discounts, taxes, totals, details }
  const {
    eating_utensils,
    serving_utensils,
    person_count,
    notes,
    tax_exempt_id,
  } = details || {}
  const hasDetails =
    eating_utensils || serving_utensils || person_count || tax_exempt_id
  const backText = auth ? 'Head back to your account page' : 'Start a new order'

  const addFavorite = (cart) => {
    const data = { cart }
    dispatch(addCustomerFavorite(data))
  }

  const removeFavorite = (favoriteId) => {
    dispatch(removeCustomerFavorite(favoriteId))
  }

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
    dispatch(setOrderServiceType(order_type, service_type))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ revenueCenterId, serviceType, items: cart }))
  }

  const updateRating = (evt) => {
    evt.preventDefault()
    const args = { orderId: order_id, orderRating: rating || {} }
    dispatch(openModal({ type: 'rating', args }))
    evt.target.blur()
  }

  const backLink = (evt) => {
    evt.preventDefault()
    if (auth) {
      dispatch(resetCustomerOrder())
      history.push('/account')
    } else {
      history.push('/')
    }
    evt.target.blur()
  }

  return (
    <div className="order">
      {isLoading && (
        <Loader text={'Retrieving your order...'} className="loading--left" />
      )}
      <OrderError error={error} backLink={backLink} backText={backText} />
      {showOrder && (
        <>
          <div className="order__header slide-up">
            <div className="container">
              <p className="ot-preface">Order #{order_id}</p>
              <h1>
                {capitalize(orderType)} from {revenue_center.name}
              </h1>
              <div className="order__buttons">
                {order.is_editable && (
                  <Button text="Edit" icon="Edit" onClick={handleEdit} />
                )}
                <Button
                  text="Reorder"
                  icon="RefreshCw"
                  onClick={handleReorder}
                />
                {!isUpcoming && (
                  <Button
                    text={rating ? 'Update Rating' : 'Add Rating'}
                    icon="Star"
                    onClick={updateRating}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="section slide-up">
            <div className="container">
              <div className="section__container">
                {/* <SectionHeader title={title} subtitle={subtitle} /> */}
                <div className="section__content ot-bg-color-primary ot-border-radius">
                  <div className="section__rows">
                    <SectionRow title="Location">
                      <OrderRevenueCenter revenueCenter={revenue_center} />
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
                        <p className="ot-font-size-small ot-color-secondary">
                          {notes}
                        </p>
                      </SectionRow>
                    ) : null}
                    {hasDetails && (
                      <SectionRow title="Other Details">
                        {eating_utensils ? (
                          <p className="ot-font-size-small ot-color-secondary">
                            Eating utensils included
                            {person_count && ` for ${person_count} people`}
                          </p>
                        ) : (
                          person_count && (
                            <p className="ot-font-size-small ot-color-secondary">
                              30 people to be accommodated
                            </p>
                          )
                        )}
                        {serving_utensils && (
                          <p className="ot-font-size-small ot-color-secondary">
                            Serving utensils included
                          </p>
                        )}
                        {tax_exempt_id && (
                          <p className="ot-font-size-small ot-color-secondary">
                            Tax exempt ID of {tax_exempt_id}
                          </p>
                        )}
                      </SectionRow>
                    )}
                    {rating ? (
                      <SectionRow title="Rating">
                        <OrderRating {...rating} />
                      </SectionRow>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section slide-up">
            <div className="container">
              <div className="section__container">
                <SectionHeader title="Items in Your Order" />
                <div className="section__content ot-bg-color-primary ot-border-radius">
                  <ul className="cart">
                    {displayedItems.map((item, index) => {
                      const favoriteId = lookup
                        ? lookup[item.signature] || null
                        : null
                      return (
                        <li key={`${item.id}-${index}`}>
                          <CartItem item={item} showModifiers={true}>
                            <OrderQuantity
                              item={item}
                              show={lookup ? true : false}
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
          </div>
          <div className="section slide-up">
            <div className="container">
              <div className="section__container">
                <SectionHeader title="Your Receipt" />
                <div className="section__content ot-bg-color-primary ot-border-radius">
                  <div className="section__check ot-border-color">
                    <Check
                      title="Order Summary"
                      check={check}
                      tenders={tenders}
                    />
                  </div>
                </div>
                <SectionFooter>
                  <button
                    type="button"
                    className="ot-btn-link"
                    onClick={backLink}
                  >
                    {backText}
                  </button>
                </SectionFooter>
              </div>
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
