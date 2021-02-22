import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  resetOrderType,
  resetOrder,
  selectOrder,
  fetchCustomerOrders,
  selectCustomerOrders,
  fetchCustomerFavorites,
  fetchCustomerGroupOrders,
  fetchRevenueCenter,
  setOrderServiceType,
  setAddress,
  selectCartQuantity,
} from '@open-tender/redux'
import { getLastOrder, makeOrderTypeName } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../../iconMap'
import { Loading } from '../..'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'

const ButtonText = styled('span')`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Continue = ({ size, icon, current, startNew }) => {
  return (
    <>
      <ButtonStyled icon={icon} onClick={current} size={size}>
        <ButtonText>Continue Current Order</ButtonText>
      </ButtonStyled>
      <ButtonStyled
        icon={iconMap.RefreshCw}
        onClick={startNew}
        size={size}
        color="secondary"
      >
        <ButtonText>Start a New Order</ButtonText>
      </ButtonStyled>
    </>
  )
}

const Reorder = ({ size, icon, orderTypeName, reorder, switchType }) => {
  return (
    <>
      <ButtonStyled icon={icon} onClick={reorder} size={size}>
        <ButtonText>Order {orderTypeName} Again</ButtonText>
      </ButtonStyled>
      <ButtonStyled
        icon={iconMap.RefreshCw}
        onClick={switchType}
        size={size}
        color="secondary"
      >
        <ButtonText>Switch Order Type</ButtonText>
      </ButtonStyled>
    </>
  )
}

const AccountActionsView = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2rem 0 0;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem -0.5rem 0;
  }

  button {
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: block;
      flex: 1 1 50%;
      padding: 1rem 1rem;
      margin: 0 0.5rem;
      line-height: 1.2;
      overflow: hidden;
    }
  }
`

const makeOrderTypeIcon = (orderType, serviceType) => {
  return orderType === 'CATERING'
    ? iconMap.Users
    : serviceType === 'DELIVERY'
    ? iconMap.Truck
    : iconMap.ShoppingBag
}

const AccountActions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, orderType, serviceType, cart } = currentOrder
  const { entities: orders, loading } = useSelector(selectCustomerOrders)
  const cartQuantity = useSelector(selectCartQuantity)
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  let orderTypeName = null
  let orderTypeIcon = iconMap.ShoppingBag
  if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderTypeName = makeOrderTypeName(order_type, service_type)
    orderTypeIcon = makeOrderTypeIcon(order_type, service_type)
  }
  const isCurrentOrder = revenueCenter && serviceType && cart.length
  if (isCurrentOrder) {
    orderTypeIcon = makeOrderTypeIcon(orderType, serviceType)
  }
  const isLoading = loading === 'pending' && !isCurrentOrder && !lastOrder
  const buttonSize = isBrowser ? 'default' : 'small'

  useEffect(() => {
    dispatch(fetchCustomerOrders(20))
    dispatch(fetchCustomerFavorites())
    dispatch(fetchCustomerGroupOrders())
  }, [dispatch])

  useEffect(() => {
    if (lastOrder && !cartQuantity) {
      const { revenue_center, service_type, order_type, address } = lastOrder
      const { revenue_center_id, is_outpost } = revenue_center
      dispatch(fetchRevenueCenter(revenue_center_id))
      dispatch(setOrderServiceType(order_type, service_type, is_outpost))
      dispatch(setAddress(address || null))
    }
  }, [lastOrder, cartQuantity, dispatch])

  const startNewOrder = () => {
    dispatch(resetOrder())
    history.push(`/order-type`)
  }

  const switchOrderType = () => {
    dispatch(resetOrderType())
    history.push(`/order-type`)
  }

  const continueCurrent = () => {
    history.push(revenueCenter ? `/menu/${revenueCenter.slug}` : '/')
  }

  return (
    <AccountActionsView>
      {isLoading ? (
        <Loading text="Retrieving your account info..." />
      ) : isCurrentOrder ? (
        <Continue
          icon={orderTypeIcon}
          size={buttonSize}
          current={continueCurrent}
          startNew={startNewOrder}
        />
      ) : lastOrder ? (
        <Reorder
          icon={orderTypeIcon}
          size={buttonSize}
          orderTypeName={orderTypeName}
          reorder={continueCurrent}
          switchType={switchOrderType}
        />
      ) : (
        <ButtonStyled
          icon={iconMap.ShoppingBag}
          onClick={startNewOrder}
          size={buttonSize}
        >
          <ButtonText>Start a New Order</ButtonText>
        </ButtonStyled>
      )}
    </AccountActionsView>
  )
}

AccountActions.displayName = 'AccountActions'

export default AccountActions
