import React, { useState, useRef } from 'react'
import propTypes from 'prop-types'
import CheckoutDetails from './CheckoutDetails'
import CheckoutContact from './CheckoutAccount'
import CheckoutAddress from './CheckoutAddress'

const CheckoutForm = ({ order, check, updateCheck, config }) => {
  const [isWorking, setIsWorking] = useState(false)
  const submitButton = useRef()
  if (!check || !check.config) return null
  const hasCustomer = check.customer && check.customer.customer_id
  const { required_fields: required } = check.config
  const isDelivery = order.serviceType === 'DELIVERY'

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
  }

  return (
    <form id="checkout-form" className="form" onSubmit={handleSubmit}>
      <CheckoutDetails title={config.details_title} order={order} />
      {isDelivery && (
        <CheckoutAddress
          title={config.address_title}
          requiredFields={required.address}
          updateCheck={updateCheck}
          order={order}
        />
      )}
      {!hasCustomer && (
        <CheckoutContact
          title={config.contact_title}
          requiredFields={required.customer}
          updateCheck={updateCheck}
        />
      )}
      <div className="form__footer">
        <input
          className="btn btn--big"
          type="submit"
          value="Submit Order"
          disabled={isWorking}
          ref={submitButton}
        />
      </div>
    </form>
  )
}

CheckoutForm.displayName = 'CheckoutForm'
CheckoutForm.propTypes = {
  config: propTypes.object,
  order: propTypes.object,
  check: propTypes.object,
  updateCheck: propTypes.func,
}

export default CheckoutForm
