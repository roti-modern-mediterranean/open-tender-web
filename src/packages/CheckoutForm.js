import React, { useState, useRef, createContext } from 'react'
import propTypes from 'prop-types'
import CheckoutDetails from './CheckoutDetails'
import CheckoutCustomer from './CheckoutCustomer'
import CheckoutAddress from './CheckoutAddress'
import CheckoutDiscounts from './CheckoutDiscounts'

export const FormContext = createContext(null)

const CheckoutForm = ({
  config,
  order,
  check,
  form,
  errors,
  updateForm,
  login,
  logout,
}) => {
  const [isWorking, setIsWorking] = useState(false)
  const submitButton = useRef()
  if (!check || !check.config) return null

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
    submitButton.current.blur()
  }

  // const isDelivery = order.serviceType === 'DELIVERY'
  const isDelivery = true

  return (
    <FormContext.Provider
      value={{ config, order, check, form, errors, updateForm, login, logout }}
    >
      <form
        id="checkout-form"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <CheckoutDetails />
        {isDelivery && <CheckoutAddress />}
        <CheckoutCustomer />
        <CheckoutDiscounts />
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
    </FormContext.Provider>
  )
}

CheckoutForm.displayName = 'CheckoutForm'
CheckoutForm.propTypes = {
  config: propTypes.object,
  order: propTypes.object,
  check: propTypes.object,
  form: propTypes.object,
  errors: propTypes.object,
  updateForm: propTypes.func,
  login: propTypes.func,
  logout: propTypes.func,
}

export default CheckoutForm
