import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectCustomerFavorites,
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
  editOrder,
} from '@open-tender/redux'
import {
  makeOrderTypeName,
  makeDisplayItem,
  isEmpty,
  isoToDate,
} from '@open-tender/js'
import { ButtonStyled, CartItem, Check } from '@open-tender/components'

import { openModal, selectDisplaySettings } from '../../slices'
import SectionHeader from '../SectionHeader'
import SectionRow from '../SectionRow'
import OrderAddress from '../OrderAddress'
import OrderRating from './OrderRating'
import OrderRequestedAt from './OrderRequestedAt'
import OrderRevenueCenter from './OrderRevenueCenter'
import OrderError from './OrderError'
import OrderQuantity from '../OrderQuantity'
import Loader from '../Loader'
import iconMap from '../iconMap'
import styled from '@emotion/styled'
import { Box, Preface } from '..'
import OrderSection from './OrderSection'

const OrderView = styled(Box)`
  max-width: ${(props) => props.theme.breakpoints.tablet};
  margin: 4rem auto;
  padding: ${(props) => props.theme.layout.padding};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

const OrderButtons = styled(`div`)`
  margin: 2rem 0 3rem;

  button + button {
    margin-left: 1rem;
  }
`

const Order = ({ order, loading, error }) => {
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    is_asap,
    requested_at,
    requested_time,
    estimated_at,
    timezone,
    delivery,
    address,
    cart,
    gift_cards,
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
  const isMerch = order_type === 'MERCH'
  const showOrder = !isLoading && !error && !isEmpty(order)
  const orderTypeName = makeOrderTypeName(order_type, service_type)
  const isUpcoming = isoToDate(requested_at) > new Date()
  const displayedItems = cart ? cart.map((i) => makeDisplayItem(i)) : []
  const { lookup = {} } = useSelector(selectCustomerFavorites)
  const { auth } = useSelector(selectCustomer)
  const displaySettings = useSelector(selectDisplaySettings)
  const check = { gift_cards, surcharges, discounts, taxes, totals, details }
  const {
    eating_utensils,
    serving_utensils,
    person_count,
    notes,
    tax_exempt_id,
  } = details || {}
  const hasDetails =
    eating_utensils || serving_utensils || person_count || tax_exempt_id

  const handleReorder = () => {
    const { revenue_center_id: revenueCenterId } = revenue_center
    const serviceType = service_type
    dispatch(setOrderServiceType(order_type, service_type))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ revenueCenterId, serviceType, items: cart }))
  }

  const updateRating = () => {
    const args = { orderId: order_id, orderRating: rating || {} }
    dispatch(openModal({ type: 'rating', args }))
  }

  return (
    <OrderView>
      {isLoading && (
        <Loader text={'Retrieving your order...'} className="loading--left" />
      )}
      <OrderError error={error} />
      {showOrder && (
        <>
          <div>
            <Preface>Order #{order_id}</Preface>
            <h1>
              {orderTypeName} from {revenue_center.name}
            </h1>
            {!isMerch && (
              <OrderButtons>
                {auth && order.is_editable && (
                  <ButtonStyled
                    icon={iconMap.Edit}
                    onClick={() => dispatch(editOrder(order))}
                  >
                    Edit
                  </ButtonStyled>
                )}
                <ButtonStyled icon={iconMap.RefreshCw} onClick={handleReorder}>
                  Reorder
                </ButtonStyled>
                {!isUpcoming && (
                  <ButtonStyled icon={iconMap.Star} onClick={updateRating}>
                    {rating ? 'Update Rating' : 'Add Rating'}
                  </ButtonStyled>
                )}
              </OrderButtons>
            )}
          </div>
          <div>
            <OrderSection label="Location">
              <OrderRevenueCenter revenueCenter={revenue_center} />
            </OrderSection>
            <OrderSection label="Requested Time">
              <OrderRequestedAt
                estimated_at={estimated_at || requested_at}
                requested_time={requested_time}
                timezone={timezone}
                is_asap={is_asap}
                status={status}
              />
            </OrderSection>
            {service_type === 'DELIVERY' && address && (
              <OrderSection label="Delivery Address">
                <OrderAddress
                  address={address}
                  delivery={delivery}
                  status={status}
                />
              </OrderSection>
            )}
            {notes && notes.length ? (
              <SectionRow title="Notes">
                <p className="ot-font-size-small">{notes}</p>
              </SectionRow>
            ) : null}
            {hasDetails && (
              <SectionRow title="Other Details">
                {eating_utensils ? (
                  <p className="ot-font-size-small">
                    Eating utensils included
                    {person_count && ` for ${person_count} people`}
                  </p>
                ) : (
                  person_count && (
                    <p className="ot-font-size-small">
                      30 people to be accommodated
                    </p>
                  )
                )}
                {serving_utensils && (
                  <p className="ot-font-size-small">
                    Serving utensils included
                  </p>
                )}
                {tax_exempt_id && (
                  <p className="ot-font-size-small">
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
          {displayedItems.length > 0 && (
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
                            <CartItem
                              item={item}
                              showModifiers={true}
                              displaySettings={displaySettings}
                            >
                              <OrderQuantity
                                item={item}
                                show={auth && lookup ? true : false}
                                favoriteId={favoriteId}
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
          )}
          <div className="section slide-up">
            <div className="container">
              <div className="section__container">
                <SectionHeader title="Your Receipt" />
                <div className="section__content">
                  <Check
                    title="Order Summary"
                    check={check}
                    tenders={tenders}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </OrderView>
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
