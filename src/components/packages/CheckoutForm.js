import React, { useState, useRef } from 'react'
import propTypes from 'prop-types'
import ContactInfo from './ContactInfo'
import AddressInfo from './AddressInfo'

const CheckoutForm = ({ order, check, updateCheck, config }) => {
  const [isWorking, setIsWorking] = useState(false)
  const submitButton = useRef()
  if (!check || !check.config) return null
  const hasCustomer = check.customer && check.customer.customer_id
  const { required_fields: required } = check.config

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
  }

  return (
    <form id="checkout-form" className="form" onSubmit={handleSubmit}>
      <AddressInfo
        title={config.address_info_title}
        requiredFields={required.address}
        updateCheck={updateCheck}
        order={order}
      />
      {!hasCustomer && (
        <ContactInfo
          title={config.contact_info_title}
          requiredFields={required.customer}
          updateCheck={updateCheck}
        />
      )}
      <input
        className="btn btn--big"
        type="submit"
        value="Submit Order"
        disabled={isWorking}
        ref={submitButton}
      />
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
