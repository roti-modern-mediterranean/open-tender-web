import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import { selectCustomerAccount } from '../slices/customerSlice'
import { selectOrder, resetOrderType } from '../slices/orderSlice'
import { selectAccountOrders } from '../slices/accountSlice'
import { selectAccountConfigSections } from '../slices/configSlice'
import { slugify, capitalize } from '../packages/utils/helpers'
import { otherOrderTypesMap } from '../packages/utils/constants'
import { Button } from '../packages'
import LastOrder from './LastOrder'
import OrderCard from './OrderCard'
import SectionLoading from './SectionLoading'

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    addresses: addressConfig,
    recentOrders: recentOrdersConfig,
  } = useSelector(selectAccountConfigSections)
  const customer = useSelector(selectCustomerAccount)
  const { address, location, serviceType, cart } = useSelector(selectOrder)
  const { entities: orders, loading } = useSelector(selectAccountOrders)
  const isLoading = loading === 'pending'
  const lastOrder = orders.length ? orders[0] : null
  let orderType = null,
    otherOrderTypes = null
  if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderType = order_type === 'OLO' ? service_type : order_type
    otherOrderTypes = otherOrderTypesMap[orderType]
  }

  const startNewOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  const reorderLastType = (evt) => {
    evt.preventDefault()
    const rcType = location.revenue_center_type.toLowerCase()
    history.push(`/menu/${location.slug}-${rcType}`)
    evt.target.blur()
  }

  const switchOrderType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    history.push(`/`)
    evt.target.blur()
  }

  return (
    <div className="greeting bg-color border-radius ot-box-shadow slide-up">
      <div className="greeting__content">
        <div className="greeting__summary">
          <div className="greeting__header">
            <h2>
              {title}, {customer.first_name}!
            </h2>
            <p>{subtitle}</p>
          </div>
          {!lastOrder ? (
            isLoading ? (
              <SectionLoading loading={isLoading} />
            ) : (
              <Button
                text="Start a New Order"
                icon="ShoppingBag"
                onClick={startNewOrder}
              />
            )
          ) : (
            <div className="greeting__header__order">
              <Button
                text={`Order ${capitalize(orderType)} Again`}
                icon="ShoppingBag"
                onClick={reorderLastType}
              />
              <p className="font-size-small">
                <Button
                  text={`Or switch to ${otherOrderTypes.join(' or ')} instead`}
                  classes="btn-link"
                  onClick={switchOrderType}
                />
              </p>
            </div>
          )}
        </div>
        <div className="greeting__order">
          {lastOrder ? (
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
                    Browse more recent orders...
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
