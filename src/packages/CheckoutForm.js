import React, { useState, useRef } from 'react'
import propTypes from 'prop-types'
import CheckoutDetails from './CheckoutDetails'
import CheckoutCustomer from './CheckoutCustomer'
import CheckoutAddress from './CheckoutAddress'

const CheckoutForm = ({ config, order, check, updateCheck }) => {
  const [isWorking, setIsWorking] = useState(false)
  const submitButton = useRef()
  if (!check || !check.config) return null
  const { required_fields: required } = check.config
  const isDelivery = order.serviceType === 'DELIVERY'

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
    submitButton.current.blur()
  }

  return (
    <form
      id="checkout-form"
      className="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <CheckoutDetails
        title={config.details_title}
        order={order}
        requiredFields={required.details}
        checkoutDetails={check.details}
        updateCheck={updateCheck}
      />
      {isDelivery && (
        <CheckoutAddress
          title={config.address_title}
          requiredFields={required.address}
          updateCheck={updateCheck}
          order={order}
        />
      )}
      <CheckoutCustomer
        config={config}
        requiredFields={required.customer}
        checkoutCustomer={check.customer}
        updateCheck={updateCheck}
      />
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
