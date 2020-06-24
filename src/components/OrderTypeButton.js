import React from 'react'
import propTypes from 'prop-types'

const OrderTypeButton = ({ title, subtitle, handler }) => (
  <button
    className="card__button bg-color bg-hover-light ot-box-shadow"
    aria-label={title}
    onClick={handler}
  >
    <span className="card__button__container">
      <span className="card__button__title heading">{title}</span>
      {/* <span className="font-size-small secondary-color">{subtitle}</span> */}
    </span>
  </button>
)

OrderTypeButton.displayName = 'OrderTypeButton'
OrderTypeButton.propTypes = {
  orderType: propTypes.string,
  handler: propTypes.func,
}
export default OrderTypeButton
