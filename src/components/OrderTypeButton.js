import React from 'react'
import propTypes from 'prop-types'
import { ArrowRight } from 'react-feather'

const OrderTypeButton = ({ title, handler, icon }) => (
  <button
    className="card__button ot-btn--light ot-box-shadow"
    aria-label={title}
    onClick={handler}
  >
    <span className="card__button__container">
      <span className="card__button__icon ot-color-primary">{icon}</span>
      <span className="card__button__title ot-heading ot-font-size-x-big">
        {title}
      </span>
      <span className="card__button__arrow ot-color-primary">
        <ArrowRight size={null} />
      </span>
    </span>
  </button>
)

OrderTypeButton.displayName = 'OrderTypeButton'
OrderTypeButton.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
  iconName: propTypes.string,
}
export default OrderTypeButton
