import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import { selectCartTotal } from '@open-tender/redux'
import {
  timezoneMap,
  isoToDateStr,
  capitalize,
  slugify,
  makeOrderAddress,
} from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectConfigAccountSections } from '../slices'
import OrderTag from './OrderTag'
import OrderImage from './OrderImage'
import iconMap from './iconMap'

const CurrentOrder = ({ order }) => {
  const history = useHistory()
  const {
    orderType,
    serviceType,
    revenueCenter,
    requestedAt,
    address,
    cart,
  } = order
  const { addresses: addressConfig } = useSelector(selectConfigAccountSections)
  const cartTotal = useSelector(selectCartTotal)
  const tz = timezoneMap[revenueCenter.timezone]
  const requestedAtStr =
    requestedAt === 'asap'
      ? 'ASAP'
      : isoToDateStr(requestedAt, tz, 'MMMM d, yyyy @ h:mma')
  const itemNames = cart.map((i) => i.name).join(', ')
  const orderTypeStr = orderType === 'OLO' ? serviceType : orderType
  const streetAddress = makeOrderAddress(address)

  const checkout = (evt) => {
    evt.preventDefault()
    history.push('/checkout')
    evt.target.blur()
  }

  const backToMenu = (evt) => {
    evt.preventDefault()
    const rcType = revenueCenter.revenue_center_type.toLowerCase()
    history.push(`/menu/${revenueCenter.slug}-${rcType}`)
    evt.target.blur()
  }

  return (
    <div className="order-card ot-bg-color-primary ot-border ot-border-radius ot-box-shadow slide-up">
      <OrderTag isUpcoming={true} status="IN_PROGRESS" />
      <div className="order-card__container">
        <div className="order-card__header">
          <p className="order-card__number ot-preface ot-font-size-x-small ot-color-secondary">
            Your Current Order
          </p>
          <p className="order-card__title">
            {capitalize(orderTypeStr)} from {revenueCenter.name}
          </p>
        </div>
        <div className="order-card__content">
          <div className="order-card__details ot-font-size-small ot-color-secondary">
            <p>
              {requestedAtStr} &nbsp;|&nbsp; ${cartTotal.toFixed(2)}
            </p>
            <p>{streetAddress}</p>
            <p>
              <Link
                activeClass="active"
                to={slugify(addressConfig.title)}
                spy={true}
                smooth={true}
                offset={-90}
              >
                Choose a different address
              </Link>
            </p>
          </div>
          <div className="order-card__items">
            <div className="order-card__images">
              {cart
                .filter((i) => i.imageUrl)
                .map((i, index) => (
                  <OrderImage
                    key={`${i.imageUrl}-${index}`}
                    imageUrl={i.imageUrl}
                    alt={i.name}
                    title={i.name}
                  />
                ))}
            </div>
            <p className="ot-font-size-x-small ot-color-secondary">
              {itemNames}
            </p>
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
            <Button
              text="Checkout"
              icon={iconMap['DollarSign']}
              onClick={checkout}
              classes="ot-btn--small ot-font-size-small"
            />
            <Button
              text="Back To Menu"
              icon={iconMap['Map']}
              onClick={backToMenu}
              classes="ot-btn--small ot-btn--secondary ot-font-size-small"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CurrentOrder.displayName = 'CurrentOrder'
CurrentOrder.propTypes = {
  order: propTypes.object,
}

export default CurrentOrder
