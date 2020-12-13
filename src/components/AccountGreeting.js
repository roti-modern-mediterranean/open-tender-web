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

import { selectAccountConfig } from '../slices'
import CurrentOrder from './CurrentOrder'
import OrderCard from './OrderCard'
import Loader from './Loader'
import iconMap from './iconMap'

const AccountGreeting = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectAccountConfig)
  const { title, subtitle } = config
  const { profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}!` : ''
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
  const orderClass = ''
  const greetingClass = `greeting slide-up ${orderClass}`

  const startNewOrder = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    history.push('/')
    evt.target.blur()
  }

  const continueCurrent = (evt) => {
    evt.preventDefault()
    if (revenueCenter) {
      history.push(`/menu/${revenueCenter.slug}`)
    } else {
      history.push(`/`)
    }
    evt.target.blur()
  }

  const switchOrderType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    history.push(`/`)
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
    <div className={greetingClass}>
      <div className="greeting__content">
        <div className="greeting__summary">
          <div className="greeting__header">
            <h1 className="greeting__header__title ot-title ot-color-light">
              {pageTitle}
            </h1>
            <p className="greeting__header__subtitle ot-subtitle ot-color-light ot-font-size-big">
              {subtitle}
            </p>
          </div>
          <div className="greeting__summary__order">
            {isCurrentOrder ? (
              <>
                <Button
                  text="Continue Current Order"
                  icon={iconMap['ShoppingBag']}
                  onClick={continueCurrent}
                  classes="ot-btn--highlight ot-btn--big"
                />
                <div className="greeting__summary__secondary">
                  <Button
                    text="Or start a new order from scratch"
                    classes="ot-btn ot-btn--small"
                    onClick={startNewOrder}
                  />
                </div>
              </>
            ) : lastOrder ? (
              <>
                <Button
                  text={`Order ${orderTypeName} Again`}
                  icon={iconMap['ShoppingBag']}
                  onClick={continueCurrent}
                  classes="ot-btn--highlight ot-btn--big"
                />
                <div className="greeting__summary__secondary">
                  <Button
                    text="Or switch to a different order type"
                    classes="ot-btn ot-btn--small"
                    onClick={switchOrderType}
                  />
                </div>
              </>
            ) : (
              <Button
                text="Start a New Order"
                icon={iconMap['ShoppingBag']}
                onClick={startNewOrder}
              />
            )}
          </div>
        </div>
        {/* {(isCurrentOrder || lastOrder) && (
          <div className="greeting__order">
            {isCurrentOrder ? (
              <CurrentOrder order={currentOrder} />
            ) : lastOrder ? (
              <OrderCard order={lastOrder} isLast={true} />
            ) : null}
          </div>
        )} */}
      </div>
    </div>
  )
}

AccountGreeting.displayName = 'AccountGreeting'

export default AccountGreeting
