import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import { timezoneMap, isoToDateStr } from '../packages/utils/datetimes'
import { capitalize, slugify } from '../packages/utils/helpers'
import { makeOrderAddress } from '../packages/utils/cart'
import { Button } from '../packages'
import { selectAccountConfigSections } from '../slices/configSlice'
import OrderTag from './OrderTag'
import OrderImage from './OrderImage'
import { selectCartTotal } from '../slices/orderSlice'

const CurrentOrder = ({ order }) => {
  const history = useHistory()
  const { orderType, serviceType, location, requestedAt, address, cart } = order
  const { addresses: addressConfig } = useSelector(selectAccountConfigSections)
  const cartTotal = useSelector(selectCartTotal)
  const tz = timezoneMap[location.timezone]
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
    const rcType = location.revenue_center_type.toLowerCase()
    history.push(`/menu/${location.slug}-${rcType}`)
    evt.target.blur()
  }

  return (
    <div className="order-card bg-color border border-radius ot-box-shadow slide-up">
      <OrderTag isUpcoming={true} status="IN_PROGRESS" />
      <div className="order-card__container">
        <div className="order-card__header">
          <p className="order-card__number preface font-size-x-small secondary-color">
            Your Current Order
          </p>
          <p className="order-card__title">
            {capitalize(orderTypeStr)} from {location.name}
          </p>
        </div>
        <div className="order-card__content">
          <div className="order-card__details font-size-small secondary-color">
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
                .map((i) => (
                  <OrderImage
                    key={i.imageUrl}
                    imageUrl={i.imageUrl}
                    alt={i.name}
                    title={i.name}
                  />
                ))}
            </div>
            <p className="font-size-x-small secondary-color">{itemNames}</p>
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
            <Button
              text="Checkout"
              icon="DollarSign"
              onClick={checkout}
              classes="btn--small font-size-small"
            />
            <Button
              text="Back To Menu"
              icon="Map"
              onClick={backToMenu}
              classes="btn--small btn--secondary font-size-small"
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
