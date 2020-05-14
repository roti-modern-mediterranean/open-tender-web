import React, { useState } from 'react'
import propTypes from 'prop-types'
import Button from './Button'
import ButtonSignUp from './ButtonSignUp'
import { CheckoutGuest } from '.'

const CheckoutAccount = ({
  title = 'Checkout as a guest',
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
    <div className="form__fieldset">
      <div className="form__legend">Your Account</div>
    </div>
  ) : (
    <>
      <div className="form__fieldset">
        <div className="form__legend">
          <p className="form__legend__title heading ot-font-size-h4">
            Wanna create an account?
          </p>
          <p className="form__legend__subtitle">
            Order history, saved favorites & allergens, saved credit cards, and
            much more. Signing up takes two seconds - start reaping the benefits
            today!
          </p>
        </div>
        <div className="form__inputs">
          <div className="form__input">
            <ButtonSignUp />
            <Button
              classes="btn-link"
              text="or checkout as a guest"
              onClick={handleGuest}
            />
          </div>
        </div>
      </div>
      {showGuest && (
        <CheckoutGuest
          title={title}
          requiredFields={requiredFields}
          checkoutCustomer={checkoutCustomer}
          updateCheck={updateCheck}
        />
      )}
    </>
  )
}

CheckoutAccount.displayName = 'ContactInfo'
CheckoutAccount.propTypes = {
  updateCheck: propTypes.func,
  requiredFields: propTypes.array,
}

export default CheckoutAccount
