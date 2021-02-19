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

const Continue = ({ current, startNew }) => {
  return (
    <>
      <ButtonStyled icon={iconMap.ShoppingBag} onClick={current} size="big">
        Continue Current Order
      </ButtonStyled>
      <div style={{ margin: '1.5rem 0 0' }}>
        <ButtonStyled onClick={startNew} size="small" color="secondary">
          Or start a new order from scratch
        </ButtonStyled>
      </div>
    </>
  )
}

const Reorder = ({ orderTypeName, reorder, switchType }) => {
  return (
    <>
      <ButtonStyled icon={iconMap.ShoppingBag} onClick={reorder} size="big">
        Order {orderTypeName} Again
      </ButtonStyled>
      <div style={{ margin: '1.5rem 0 0' }}>
        <ButtonStyled onClick={switchType} size="small" color="secondary">
          Or switch to a different order type
        </ButtonStyled>
      </div>
    </>
  )
}

const AccountActionsView = styled('div')`
  margin: 2rem 0 0;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1.5rem 0 0;
  }
`

const AccountActions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const { entities: orders, loading } = useSelector(selectCustomerOrders)
  const cartQuantity = useSelector(selectCartQuantity)
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  let orderTypeName = null
  if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderTypeName = makeOrderTypeName(order_type, service_type)
  }
  const isCurrentOrder = revenueCenter && serviceType && cart.length
  const isLoading = loading === 'pending' && !isCurrentOrder && !lastOrder
  console.log(revenueCenter)

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
    history.push(`/order-types`)
  }

  const switchOrderType = () => {
    dispatch(resetOrderType())
    history.push(`/order-types`)
  }

  const continueCurrent = () => {
    history.push(revenueCenter ? `/menu/${revenueCenter.slug}` : '/')
  }

  return (
    <AccountActionsView>
      {isLoading ? (
        <Loading text="Retrieving your account info..." />
      ) : isCurrentOrder ? (
        <Continue current={continueCurrent} startNew={startNewOrder} />
      ) : lastOrder ? (
        <Reorder
          orderTypeName={orderTypeName}
          reorder={continueCurrent}
          switchType={switchOrderType}
        />
      ) : (
        <ButtonStyled
          icon={iconMap.ShoppingBag}
          onClick={startNewOrder}
          size="big"
        >
          Start a New Order
        </ButtonStyled>
      )}
    </AccountActionsView>
  )
}

AccountActions.displayName = 'AccountActions'

export default AccountActions
