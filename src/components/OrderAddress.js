import React from 'react'
import propTypes from 'prop-types'
import { DeliveryLink } from '../packages'
import CircleLoader from '../packages/CircleLoader'

const Default = ({ isDefault }) =>
  isDefault ? (
    <span className="section__row__default">
      <CircleLoader complete={true} />
    </span>
  ) : null

const OrderAddress = ({ address, delivery, status, isDefault, children }) => {
  const { street, unit, city, state, postal_code, company, contact, phone } =
    address || {}
  const streetAddress = street ? `${street}${unit ? `, ${unit}` : ''}` : null
  const contactPhone =
    contact || phone ? [contact, phone].filter((i) => i).join(' @ ') : null
  const trackingUrl = status === 'OPEN' && delivery && delivery.tracking_url
  return (
    <>
      {company ? (
        <>
          <p className="section__row__relative">
            {company}
            <Default isDefault={isDefault} />
          </p>
          <p className="font-size-small secondary-color">{streetAddress}</p>
        </>
      ) : (
        <p className="section__row__relative">
          {streetAddress}
          <Default isDefault={isDefault} />
        </p>
      )}
      <p className="font-size-small secondary-color">
        {city}, {state} {postal_code}
      </p>
      {contactPhone && (
        <p className="font-size-small secondary-color">{contactPhone}</p>
      )}
      {trackingUrl && (
        <p className="font-size-small">
          <DeliveryLink
            text="Check delivery status"
            trackingUrl={trackingUrl}
          />
        </p>
      )}
      {children}
    </>
  )
}

OrderAddress.displayName = 'OrderAddress'
OrderAddress.propTypes = {
  address: propTypes.object,
  delivery: propTypes.object,
  status: propTypes.string,
  isDefault: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default OrderAddress
