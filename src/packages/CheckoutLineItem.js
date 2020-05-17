import React from 'react'
import propTypes from 'prop-types'

const CheckoutLineItem = ({ label, required, classes = '', children }) => {
  return (
    <div className={`form__line border-color ${classes}`}>
      <div className="form__line__label">
        {label}
        {required ? <span className="required">*</span> : null}
      </div>
      <div className="form__line__value">{children}</div>
    </div>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'
CheckoutLineItem.propTypes = {
  label: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  classes: propTypes.string,
}

export default CheckoutLineItem
