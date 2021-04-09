import React, { createContext } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectCustomer,
  selectCustomerFavorites,
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
  editOrder,
} from '@open-tender/redux'
import {
  isEmpty,
  isoToDate,
  makeDisplayItem,
  makeServiceTypeName,
  makeTenderName,
} from '@open-tender/js'
import { ButtonStyled, Preface } from '@open-tender/components'

import { openModal, selectOutpostName } from '../../slices'
import { Loading } from '..'
import OrderRequestedAt from './OrderRequestedAt'
import CheckoutCart from '../pages/CheckoutPayment/CheckoutCart'

const OrderView = styled('div')`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.tablet};
  padding: ${(props) => props.theme.layout.padding};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.light};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    margin: 3rem auto;
  }

  h1 {
    line-height: 1;
    margin: 0.5rem 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }
`

const OrderButtons = styled(`div`)`
  display: flex;
  justify-content: center;
  margin: 3rem 0;

  button {
    display: block;
    min-width: 12rem;
  }

  button + button {
    margin-left: 1rem;
  }
`

const OrderCentered = styled('div')`
  display: flex;
  justify-content: center;
  max-width: ${(props) => props.theme.breakpoints.tablet};
  margin: 4rem auto;
  text-align: center;
`

const OrderPreface = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.5rem;
    line-height: 1.53333;
  }
`

const OrderStatus = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;

  span {
    display: block;
    font-weight: 500;
    font-size: 2.8rem;
  }
`

const OrderDetails = styled('div')`
  margin: 3rem 0 2rem;
`

const OrderDetail = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  flex-wrap: wrap;
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {}

  span,
  a {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 1.277778;
  }

  span + span {
    font-weight: normal;
  }
`

const OrderNotes = styled('div')`
  margin: 2rem 0 0;

  p {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.8rem;
    line-height: 1.277778;
  }
`

const handleOrderError = (error) => {
  switch (error) {
    case 'The requested object does not exist.':
      return "We couldn't find this order. Please double check your order ID and give it another try."
    default:
      return error
  }
}

const makeOrderStatus = (status, serviceType, isUpcoming) => {
  switch (status) {
    case 'OPEN':
      return 'In Process'
    case 'CLOSED':
      return isUpcoming
        ? 'In Process'
        : serviceType === 'DELIVERY'
        ? 'Delivered'
        : 'Picked Up'
    default:
      return status
  }
}

export const OrderContext = createContext(null)

const Order = ({ order, loading, error, isConfirmation }) => {
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
  console.log(order)
  const dispatch = useDispatch()
  const isLoading = loading === 'pending'
  const isMerch = order_type === 'MERCH'
  const errMsg = handleOrderError(error)
  const isUpcoming = isoToDate(requested_at) > new Date()
  const displayedItems = cart
    ? cart
        .map((i) => makeDisplayItem(i))
        .map((i) => ({ ...i, price_total: i.totalPrice }))
    : []
  const { lookup = {} } = useSelector(selectCustomerFavorites)
  const { auth } = useSelector(selectCustomer)
  const check = {
    cart: displayedItems,
    gift_cards,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
  }
  const { notes } = details || {}
  const orderStatus = makeOrderStatus(status, service_type, isUpcoming)
  const outpostName = useSelector(selectOutpostName)
  const isCatering = order_type === 'CATERING'
  const isOutpost = revenue_center ? revenue_center.is_outpost : false
  const serviceTypeName = makeServiceTypeName(
    service_type,
    isCatering,
    isOutpost,
    outpostName
  )
  const { street, unit, city, state, postal_code, company, contact, phone } =
    address || {}
  const deliveryContact = [company, contact, phone].filter((i) => i).join(' / ')
  const trackingUrl = status === 'OPEN' && delivery && delivery.tracking_url
  const payment = tenders
    ? tenders.map((i) => makeTenderName(i)).join(', ')
    : null

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

  return !isEmpty(order) ? (
    <OrderContext.Provider value={{ lookup }}>
      {!isMerch && (
        <OrderButtons>
          {auth && order.is_editable && (
            <ButtonStyled
              onClick={() => dispatch(editOrder(order))}
              size="small"
            >
              Edit
            </ButtonStyled>
          )}
          <ButtonStyled onClick={handleReorder} size="small">
            Reorder
          </ButtonStyled>
          {!isUpcoming && (
            <ButtonStyled onClick={updateRating} size="small">
              {rating ? 'Update Rating' : 'Add Rating'}
            </ButtonStyled>
          )}
        </OrderButtons>
      )}
      <OrderView>
        <OrderPreface>
          <span>Order #{order_id}</span>
          <span>
            <OrderRequestedAt
              estimated_at={estimated_at || requested_at}
              requested_time={requested_time}
              timezone={timezone}
              is_asap={is_asap}
              status={status}
            />
          </span>
        </OrderPreface>
        <OrderStatus>
          <Preface>Status</Preface>
          <Preface>{orderStatus}</Preface>
        </OrderStatus>
        <OrderDetails>
          <OrderDetail>
            <span>Restaurant</span>
            <span>{revenue_center.name}</span>
          </OrderDetail>
          <OrderDetail>
            <span>Service Type</span>
            <span>{serviceTypeName}</span>
          </OrderDetail>
          {deliveryContact && (
            <OrderDetail>
              <span>Company / Contact</span>
              <span>{deliveryContact}</span>
            </OrderDetail>
          )}
          {service_type === 'DELIVERY' && (
            <OrderDetail>
              <span>Delivery Address</span>
              <span>
                {street}, {unit}, {city}, {state} {postal_code}
              </span>
            </OrderDetail>
          )}
          {payment && (
            <OrderDetail>
              <span>Payment</span>
              <span>{payment}</span>
            </OrderDetail>
          )}
          {trackingUrl && (
            <OrderDetail>
              <span>&nbsp;</span>
              <a
                href={trackingUrl}
                rel="noopener noreferrer"
                target="_blank"
                title="Check delivery status"
              >
                Check delivery status
              </a>
            </OrderDetail>
          )}
          {notes && (
            <OrderNotes>
              <OrderDetail>
                <span>Order Notes</span>
              </OrderDetail>
              <p>{notes}</p>
            </OrderNotes>
          )}
        </OrderDetails>
        <CheckoutCart check={check} showBorder={true} style={{ margin: '0' }} />
      </OrderView>
    </OrderContext.Provider>
  ) : isLoading ? (
    <OrderCentered>
      <Loading text="Retrieving your order..." />
    </OrderCentered>
  ) : error ? (
    <OrderCentered>
      <p>{errMsg}</p>
    </OrderCentered>
  ) : null
}

Order.displayName = 'Order'
Order.propTypes = {
  order: propTypes.object,
  loading: propTypes.string,
  error: propTypes.string,
  goToAccount: propTypes.func,
}

export default Order
