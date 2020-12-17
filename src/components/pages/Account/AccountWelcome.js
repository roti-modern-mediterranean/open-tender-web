import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectCustomer,
  selectOrder,
  selectCustomerOrders,
  resetOrderType,
  resetOrder,
} from '@open-tender/redux'
import { getLastOrder, makeOrderTypeName } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig } from '../../../slices'
import Loader from '../../Loader'
import iconMap from '../../iconMap'
import styled from '@emotion/styled'

const AccountWelcomeGreeting = styled('div')`
  width: 100%;
  flex: 1 0 100%;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`

const AccountWelcomeHeader = styled('div')`
  margin: 0 0 2rem;

  p {
    color: ${(props) => props.theme.fonts.headings.color};
    margin: 0.5rem 0 0;
  }
`

const AccountWelcomeContent = styled('div')`
  margin: 0;
`

const AccountWelcomeButtons = styled('div')`
  width: 100%;
  flex: 0 0 auto;
`

const Continue = ({ current, startNew }) => {
  return (
    <>
      <Button
        text="Continue Current Order"
        icon={iconMap['ShoppingBag']}
        onClick={current}
        classes="ot-btn ot-btn--big"
      />
      <div style={{ margin: '1.5rem 0 0' }}>
        <Button
          text="Or start a new order from scratch"
          classes="ot-btn ot-btn--small ot-btn--secondary"
          onClick={startNew}
        />
      </div>
    </>
  )
}

const Reorder = ({ orderTypeName, reorder, switchType }) => {
  return (
    <>
      <Button
        text={`Order ${orderTypeName} Again`}
        icon={iconMap['ShoppingBag']}
        onClick={reorder}
        classes="ot-btn ot-btn--big"
      />
      <div style={{ margin: '1.5rem 0 0' }}>
        <Button
          text="Or switch to a different order type"
          classes="ot-btn ot-btn--small ot-btn--secondary"
          onClick={switchType}
        />
      </div>
    </>
  )
}

const AccountWelcome = ({ children }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectAccountConfig)
  const { title, subtitle } = config
  const { profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const { entities: orders, loading } = useSelector(selectCustomerOrders)
  const isLoading = loading === 'pending'
  const lastOrder = getLastOrder(orders)
  let orderTypeName = null
  if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderTypeName = makeOrderTypeName(order_type, service_type)
  }
  const isCurrentOrder = revenueCenter && serviceType && cart.length
  const accountLoading = isLoading && !isCurrentOrder && !lastOrder

  const startNewOrder = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    history.push('/')
    evt.target.blur()
  }

  const switchOrderType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    history.push(`/`)
    evt.target.blur()
  }

  const continueCurrent = (evt) => {
    evt.preventDefault()
    history.push(revenueCenter ? `/menu/${revenueCenter.slug}` : '/')
    evt.target.blur()
  }

  return accountLoading ? (
    <>
      <Loader
        text="Retrieving your account info..."
        className="loading--left"
      />
    </>
  ) : (
    <>
      <AccountWelcomeGreeting>
        <AccountWelcomeHeader>
          <h1>{pageTitle}</h1>
          <p>{subtitle}</p>
        </AccountWelcomeHeader>
        <AccountWelcomeContent>
          {isCurrentOrder ? (
            <Continue current={continueCurrent} startNew={startNewOrder} />
          ) : lastOrder ? (
            <Reorder
              orderTypeName={orderTypeName}
              reorder={continueCurrent}
              switchType={switchOrderType}
            />
          ) : (
            <Button
              text="Start a New Order"
              icon={iconMap['ShoppingBag']}
              onClick={startNewOrder}
            />
          )}
        </AccountWelcomeContent>
      </AccountWelcomeGreeting>
      <AccountWelcomeButtons>{children}</AccountWelcomeButtons>
    </>
  )
}

AccountWelcome.displayName = 'AccountWelcome'

export default AccountWelcome
