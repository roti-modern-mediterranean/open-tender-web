import React, { useState } from 'react'
import propTypes from 'prop-types'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'
import TransitionWrapper from './TransitionWrapper'

const CheckoutCustomer = ({
  config,
  requiredFields,
  checkoutCustomer,
  updateCheck,
  login,
  logout,
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
      logout={logout}
    />
  ) : (
    <>
      <CheckoutSignUp handleGuest={handleGuest} config={config.sign_up} />
      <TransitionWrapper
        on={showGuest}
        transitionKey="guest"
        // effect="slide-in-from-right"
      >
        <CheckoutGuest
          title={config.guest_title}
          requiredFields={requiredFields}
          checkoutCustomer={checkoutCustomer}
          updateCheck={updateCheck}
          login={login}
        />
      </TransitionWrapper>
    </>
  )
}

CheckoutCustomer.displayName = 'ContactInfo'
CheckoutCustomer.propTypes = {
  updateCheck: propTypes.func,
  requiredFields: propTypes.array,
}

export default CheckoutCustomer
