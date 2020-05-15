import React, { useState } from 'react'
import propTypes from 'prop-types'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'

const CheckoutCustomer = ({
  config,
  requiredFields,
  checkoutCustomer,
  updateCheck,
}) => {
  const [showGuest, setShowGuest] = useState(false)
  const hasAccount = checkoutCustomer && checkoutCustomer.customer_id

  const handleGuest = (evt) => {
    evt.preventDefault()
    setShowGuest(!showGuest)
    evt.target.blur()
  }

  return hasAccount ? (
    <CheckoutAccount
      title={config.account_title}
      requiredFields={requiredFields}
      checkoutCustomer={checkoutCustomer}
      updateCheck={updateCheck}
    />
  ) : (
    <>
      <CheckoutSignUp handleGuest={handleGuest} config={config.sign_up} />
      {showGuest && (
        <CheckoutGuest
          title={config.guest_title}
          requiredFields={requiredFields}
          checkoutCustomer={checkoutCustomer}
          updateCheck={updateCheck}
        />
      )}
    </>
  )
}

CheckoutCustomer.displayName = 'ContactInfo'
CheckoutCustomer.propTypes = {
  updateCheck: propTypes.func,
  requiredFields: propTypes.array,
}

export default CheckoutCustomer
