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
import { isEmpty, isoToDate, makeDisplayItem } from '@open-tender/js'
import { ButtonStyled, Preface } from '@open-tender/components'

import { openModal } from '../../slices'
import { Loading } from '..'
import OrderRequestedAt from './OrderRequestedAt'
import CheckoutCart from '../pages/CheckoutPayment/CheckoutCart'
import OrderDetails from './OrderDetails'

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
    address,
    cart,
    gift_cards,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
    rating,
  } = order || {}
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
  const orderStatus = makeOrderStatus(status, service_type, isUpcoming)

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
        <OrderDetails order={order} />
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
}

export default Order
