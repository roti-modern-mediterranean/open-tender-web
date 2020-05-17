import React, { useState, useContext } from 'react'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'
// import TransitionWrapper from './TransitionWrapper'
import { FormContext } from './CheckoutForm'

const CheckoutCustomer = () => {
  const formContext = useContext(FormContext)
  const { form } = formContext
  const [showGuest, setShowGuest] = useState(false)
  const hasAccount = form.customer && form.customer.customer_id

  const handleGuest = (evt) => {
    evt.preventDefault()
    setShowGuest(!showGuest)
    evt.target.blur()
  }

  return hasAccount ? (
    <CheckoutAccount />
  ) : (
    <>
      <CheckoutSignUp handleGuest={handleGuest} />
      {showGuest && <CheckoutGuest />}
      {/* <TransitionWrapper on={showGuest} transitionKey="guest">
        <CheckoutGuest />
      </TransitionWrapper> */}
    </>
  )
}

CheckoutCustomer.displayName = 'CheckoutCustomer'

export default CheckoutCustomer
