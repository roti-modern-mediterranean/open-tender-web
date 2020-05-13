import React from 'react'
import propTypes from 'prop-types'

const CheckoutDetails = ({ title = 'Order Details', order }) => {
  return (
    <div className="form__fieldset">
      <div className="form__legend heading ot-font-size-h4">{title}</div>
      <div className="form__inputs">
        <div className="form__line">
          <div className="form__line__label">Service Type</div>
          <div className="form__line__value">
            {order.serviceType.toLowerCase()}
          </div>
        </div>
        <div className="form__line">
          <div className="form__line__label">
            {order.serviceType.toLowerCase()} Time
          </div>
          <div className="form__line__value">{order.requestedAt}</div>
        </div>
      </div>
    </div>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
CheckoutDetails.propTypes = {
  title: propTypes.string,
  order: propTypes.string,
}

export default CheckoutDetails
