import React from 'react'
import propTypes from 'prop-types'

const OrderTypeButton = ({ orderType, handler }) =>
  orderType ? (
    <button
      className="card__button heading bg-color bg-hover-light ot-box-shadow"
      aria-label={orderType}
      onClick={handler}
    >
      {orderType}
    </button>
  ) : null

OrderTypeButton.displayName = 'OrderTypeButton'
OrderTypeButton.propTypes = {
  orderType: propTypes.string,
  handler: propTypes.func,
}
export default OrderTypeButton
