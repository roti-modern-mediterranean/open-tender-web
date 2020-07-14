import React from 'react'
import propTypes from 'prop-types'
import { ArrowRight } from 'react-feather'

const OrderTypeButton = ({ title, handler, icon }) => (
  <button
    className="content__button ot-btn--light ot-box-shadow ot-border-radius-small ot-font-size"
    aria-label={title}
    onClick={handler}
  >
    <span className="content__button__container">
      <span className="content__button__icon ot-color-primary">{icon}</span>
      <span className="content__button__title ot-heading ot-font-size-h4">
        {title}
      </span>
      <span className="content__button__arrow ot-color-primary">
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
