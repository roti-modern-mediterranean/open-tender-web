import React from 'react'
import propTypes from 'prop-types'
import { ButtonLocation, ButtonServiceType, ButtonRequestedAt } from './index'
import { serviceTypeNamesMap } from './constants'

const CheckoutLine = ({ label, action }) => {
  return (
    <div className="form__line border-color">
      <div className="form__line__label">{label}</div>
      <div className="form__line__value">{action}</div>
    </div>
  )
}

const CheckoutDetails = ({ title = 'Order Details', order }) => {
  const serviceTypeName = serviceTypeNamesMap[order.serviceType]
  return (
    <div className="form__fieldset">
      {/* <div className="form__legend heading ot-font-size-h5">{title}</div> */}
      <div className="form__inputs">
        <CheckoutLine
          label="Location"
          action={<ButtonLocation classes="btn--header" />}
        />
        <CheckoutLine
          label="Service Type"
          action={<ButtonServiceType classes="btn--header" />}
        />
        <CheckoutLine
          label={`${serviceTypeName} Time`}
          action={<ButtonRequestedAt classes="btn--header" />}
        />
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
