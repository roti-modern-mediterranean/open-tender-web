import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import { parseISO } from 'date-fns'
import {
  selectOrder,
  selectCustomerOrders,
  resetOrderType,
  resetOrder,
  resetRevenueCenter,
} from '@open-tender/redux'
import { slugify, capitalize, otherOrderTypesMap } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectConfigAccountSections } from '../slices'
import CurrentOrder from './CurrentOrder'
import OrderCard from './OrderCard'
import AccountLoyalty from './AccountLoyalty'
import Loader from './Loader'
import iconMap from './iconMap'

const GreetingLink = ({ sectionTitle, text }) => (
  <Link
    activeClass="active"
    className="link"
    to={slugify(sectionTitle)}
    spy={true}
    smooth={true}
    offset={-90}
  >
    {text}
  </Link>
)

const getLastOrder = (orders) => {
  if (!orders || !orders.length) return null
  const withCreated = orders
    .map((i) => ({ ...i, createdAt: parseISO(i.created_at) }))
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse()
  return withCreated[0]
}

const AccountGreeting = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectConfigAccountSections)
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const { entities: orders, loading } = useSelector(selectCustomerOrders)
  const isLoading = loading === 'pending'
  const lastOrder = getLastOrder(orders)
  let orderType = null,
    otherOrderTypes = null
  if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderType = order_type === 'OLO' ? service_type : order_type
    otherOrderTypes = otherOrderTypesMap[orderType]
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

  const changeRevenueCenter = (evt) => {
    evt.preventDefault()
    dispatch(resetRevenueCenter())
    history.push(`/locations`)
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
      <div className="container">
        <div className="greeting__content">
          <div className="greeting__summary">
            <div className="greeting__summary__order">
              {isCurrentOrder ? (
                <>
                  <Button
                    text="Continue Current Order"
                    icon={iconMap['ShoppingBag']}
                    onClick={continueCurrent}
                  />
                  <p className="ot-font-size-small">
                    <Button
                      text="Or start a new order from scratch"
                      classes="ot-btn-link"
                      onClick={startNewOrder}
                    />
                  </p>
                </>
              ) : lastOrder ? (
                <>
                  <Button
                    text={`Order ${capitalize(orderType)} Again`}
                    icon={iconMap['ShoppingBag']}
                    onClick={continueCurrent}
                  />
                  <p className="ot-font-size-small">
                    <Button
                      text={`Or switch to ${otherOrderTypes.join(
                        ' or '
                      )} instead`}
                      classes="ot-btn-link"
                      onClick={switchOrderType}
                    />
                  </p>
                </>
              ) : (
                <Button
                  text="Start a New Order"
                  icon={iconMap['ShoppingBag']}
                  onClick={startNewOrder}
                />
              )}
            </div>
            <AccountLoyalty />
            <div className="greeting__summary__options">
              <p className="ot-font-size-small ot-bold">
                Other things you can do from here...
              </p>
              <ul className="ot-font-size-small">
                <li>
                  <span>
                    Reorder from your{' '}
                    <GreetingLink
                      sectionTitle={config.favorites.title}
                      text="favorites"
                    />{' '}
                    or{' '}
                    <GreetingLink
                      sectionTitle={config.recentItems.title}
                      text="recently ordered items"
                    />
                  </span>
                </li>
                <li>
                  <span>
                    Update your{' '}
                    <GreetingLink
                      sectionTitle={config.profile.title}
                      text="profile"
                    />
                    ,{' '}
                    <GreetingLink
                      sectionTitle={config.allergens.title}
                      text="allergens"
                    />{' '}
                    or{' '}
                    <GreetingLink
                      sectionTitle={config.creditCards.title}
                      text="cards on file"
                    />
                  </span>
                </li>
                <li>
                  <span>
                    Manage your{' '}
                    <GreetingLink
                      sectionTitle={config.addresses.title}
                      text="addresses"
                    />{' '}
                    and{' '}
                    <GreetingLink
                      sectionTitle={config.giftCards.title}
                      text="gift cards"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {(isCurrentOrder || lastOrder) && (
            <div className="greeting__order">
              {isCurrentOrder ? (
                <>
                  <CurrentOrder order={currentOrder} />
                  <div className="greeting__order__footer">
                    <p className="ot-font-size-small">
                      <Button
                        text="Change location"
                        classes="ot-btn-link"
                        onClick={changeRevenueCenter}
                      />{' '}
                      or{' '}
                      <Button
                        text="switch order type"
                        classes="ot-btn-link"
                        onClick={switchOrderType}
                      />
                    </p>
                  </div>
                </>
              ) : lastOrder ? (
                <>
                  <OrderCard order={lastOrder} isLast={true} />
                  <div className="greeting__order__footer">
                    <p className="ot-font-size-small">
                      <GreetingLink
                        sectionTitle={config.recentOrders.title}
                        text="See other recent orders..."
                      />
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AccountGreeting.displayName = 'AccountGreeting'

export default AccountGreeting
