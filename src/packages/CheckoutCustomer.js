import React, { useState } from 'react'
import propTypes from 'prop-types'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'
import TransitionWrapper from './TransitionWrapper'

const CheckoutCustomer = ({
  config,
  requiredFields,
  formCustomer,
  updateForm,
  login,
  logout,
}) => {
  const [showGuest, setShowGuest] = useState(false)
  const hasAccount = formCustomer && formCustomer.customer_id

  const handleGuest = (evt) => {
    evt.preventDefault()
    setShowGuest(!showGuest)
    evt.target.blur()
  }

  return hasAccount ? (
    <CheckoutAccount
      title={config.account_title}
      requiredFields={requiredFields}
      formCustomer={formCustomer}
      updateForm={updateForm}
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
          formCustomer={formCustomer}
          updateForm={updateForm}
          login={login}
        />
      </TransitionWrapper>
    </>
  )
}

CheckoutCustomer.displayName = 'CheckoutCustomer'
CheckoutCustomer.propTypes = {
  config: propTypes.object,
  requiredFields: propTypes.array,
  formCustomer: propTypes.object,
  updateForm: propTypes.func,
  login: propTypes.func,
  logout: propTypes.func,
}

export default CheckoutCustomer
