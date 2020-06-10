import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import ClipLoader from 'react-spinners/ClipLoader'
import { selectCustomerAccount } from '../slices/customerSlice'
import {
  selectOrder,
  resetOrderType,
  resetOrder,
  resetLocation,
} from '../slices/orderSlice'
import { selectAccountOrders } from '../slices/accountSlice'
import { selectAccountConfigSections } from '../slices/configSlice'
import { slugify, capitalize } from '../packages/utils/helpers'
import { otherOrderTypesMap } from '../packages/utils/constants'
import { Button } from '../packages'
import CurrentOrder from './CurrentOrder'
import OrderCard from './OrderCard'

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    addresses: addressConfig,
    recentOrders: recentOrdersConfig,
  } = useSelector(selectAccountConfigSections)
  const customer = useSelector(selectCustomerAccount)
  const currentOrder = useSelector(selectOrder)
  const { address, location, serviceType, cart } = currentOrder
  const { entities: orders, loading } = useSelector(selectAccountOrders)
  const isLoading = loading === 'pending'
  // const isLoading = true
  const lastOrder = orders.length ? orders[0] : null
  let orderType = null,
    otherOrderTypes = null
  if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderType = order_type === 'OLO' ? service_type : order_type
    otherOrderTypes = otherOrderTypesMap[orderType]
  }
  const isCurrentOrder = location && serviceType && cart.length
  const accountLoading = isLoading && !isCurrentOrder && !lastOrder

  const startNewOrder = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    history.push('/')
    evt.target.blur()
  }

  const continueCurrent = (evt) => {
    evt.preventDefault()
    const rcType = location.revenue_center_type.toLowerCase()
    history.push(`/menu/${location.slug}-${rcType}`)
    evt.target.blur()
  }

  const changeLocation = (evt) => {
    evt.preventDefault()
    dispatch(resetLocation())
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
    <div className="greeting bg-color border-radius ot-box-shadow slide-up">
      <div className="greeting__content">
        <div className="greeting__summary">
          <div className="greeting__header">
            <h2>
              {title}, {customer.first_name}!
            </h2>
            <p>{subtitle}</p>
          </div>
          {isCurrentOrder ? (
            <div className="greeting__header__order">
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
            </div>
          ) : lastOrder ? (
            <div className="greeting__header__order">
              <Button
                text={`Order ${capitalize(orderType)} Again`}
                icon="ShoppingBag"
                onClick={continueCurrent}
              />
              <p className="font-size-small">
                <Button
                  text={`Or switch to ${otherOrderTypes.join(' or ')} instead`}
                  classes="btn-link"
                  onClick={switchOrderType}
                />
              </p>
            </div>
          ) : (
            <Button
              text="Start a New Order"
              icon="ShoppingBag"
              onClick={startNewOrder}
            />
          )}
        </div>
        <div className="greeting__order">
          {isCurrentOrder ? (
            <>
              <CurrentOrder order={currentOrder} />
              <div className="greeting__order__footer">
                <p className="font-size-small">
                  <Button
                    text="Change location"
                    classes="btn-link"
                    onClick={changeLocation}
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
                  <Link
                    activeClass="active"
                    className="link"
                    to={slugify(recentOrdersConfig.title)}
                    spy={true}
                    smooth={true}
                    offset={-90}
                  >
                    See other recent orders...
                  </Link>
                </p>
              </div>
            </>
          ) : null}
        </div>
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
