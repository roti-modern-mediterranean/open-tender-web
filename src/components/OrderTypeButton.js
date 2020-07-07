import React from 'react'
import propTypes from 'prop-types'

const OrderTypeButton = ({ title, handler }) => (
  <button
    className="card__button ot-btn--light ot-box-shadow"
    aria-label={title}
    onClick={handler}
  >
    <span className="card__button__container">
      <span className="card__button__title ot-heading">{title}</span>
    </span>
  </button>
)

OrderTypeButton.displayName = 'OrderTypeButton'
OrderTypeButton.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
}
export default OrderTypeButton
