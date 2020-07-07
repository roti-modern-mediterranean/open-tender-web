import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import { parseISO } from 'date-fns'
import {
  selectOrder,
  selectCustomerProfile,
  selectCustomerOrders,
  resetOrderType,
  resetOrder,
  resetRevenueCenter,
} from 'open-tender-redux'
import { slugify, capitalize, otherOrderTypesMap } from 'open-tender-js'
import { Button } from 'open-tender'
import ClipLoader from 'react-spinners/ClipLoader'

import { selectConfigAccountSections } from '../slices'
import CurrentOrder from './CurrentOrder'
import OrderCard from './OrderCard'
import AccountLoyalty from './AccountLoyalty'

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

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectConfigAccountSections)
  const customer = useSelector(selectCustomerProfile)
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
  const greetingClass = `greeting bg-color border-radius ot-box-shadow slide-up ${orderClass}`

  const startNewOrder = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    history.push('/')
    evt.target.blur()
  }

  const continueCurrent = (evt) => {
    evt.preventDefault()
    const rcType = revenueCenter.revenue_center_type.toLowerCase()
    history.push(`/menu/${revenueCenter.slug}-${rcType}`)
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
    <div className="hero__loading">
      <div className="hero__loading__content ot-bold ot-light-color">
        <p>Loading your account...</p>
      </div>
      <div className="hero__loading__loader">
        <ClipLoader size={36} color={'#ffffff'} />
      </div>
    </div>
  ) : (
    <div className={greetingClass}>
      <div className="greeting__content">
        <div className="greeting__summary">
          <div className="greeting__summary__header">
            <h2>
              {title}, {customer.first_name}!
            </h2>
            <p>{subtitle}</p>
          </div>
          <div className="greeting__summary__order">
            {isCurrentOrder ? (
              <>
                <Button
                  text="Continue Current Order"
                  icon="ShoppingBag"
                  onClick={continueCurrent}
                />
                <p className="font-size-small">
                  <Button
                    text="Or start a new order from scratch"
                    classes="btn-link"
                    onClick={startNewOrder}
                  />
                </p>
              </>
            ) : lastOrder ? (
              <>
                <Button
                  text={`Order ${capitalize(orderType)} Again`}
                  icon="ShoppingBag"
                  onClick={continueCurrent}
                />
                <p className="font-size-small">
                  <Button
                    text={`Or switch to ${otherOrderTypes.join(
                      ' or '
                    )} instead`}
                    classes="btn-link"
                    onClick={switchOrderType}
                  />
                </p>
              </>
            ) : (
              <Button
                text="Start a New Order"
                icon="ShoppingBag"
                onClick={startNewOrder}
              />
            )}
          </div>
          <AccountLoyalty />
          <div className="greeting__summary__options">
            <p className="font-size-small ot-bold">
              Other things you can do from here...
            </p>
            <ul className="font-size-small">
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
                    sectionTitle={config.accountDetails.title}
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
                  <p className="font-size-small">
                    <Button
                      text="Change location"
                      classes="btn-link"
                      onClick={changeRevenueCenter}
                    />{' '}
                    or{' '}
                    <Button
                      text="switch order type"
                      classes="btn-link"
                      onClick={switchOrderType}
                    />
                  </p>
                </div>
              </>
            ) : lastOrder ? (
              <>
                <OrderCard order={lastOrder} isLast={true} />
                <div className="greeting__order__footer">
                  <p className="font-size-small">
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
  )
}

AccountGreeting.displayName = 'AccountGreeting'
AccountGreeting.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
}

export default AccountGreeting
