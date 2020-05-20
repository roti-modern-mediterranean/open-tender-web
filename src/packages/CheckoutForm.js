import React, { useState, useRef, createContext } from 'react'
import propTypes from 'prop-types'
import CheckoutDetails from './CheckoutDetails'
import CheckoutCustomer from './CheckoutCustomer'
import CheckoutAddress from './CheckoutAddress'
import CheckoutDiscounts from './CheckoutDiscounts'
import CheckoutPromoCodes from './CheckoutPromoCodes'
import CheckoutGiftCards from './CheckoutGiftCards'
import CheckoutTenders from './CheckoutTenders'
import { checkAmountRemaining } from './utils'

export const FormContext = createContext(null)

const CheckoutForm = ({
  config,
  order,
  check,
  form,
  loading,
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

  const isDelivery = order.serviceType === 'DELIVERY'
  const hasGiftCardTender = check.config.tender_types.includes('GIFT_CARD')
  const amountRemaining = checkAmountRemaining(check.totals.total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
  // const isBalance = amountRemaining !== 0
  // const showGiftCards = hasGiftCardTender && (isBalance || form.giftCards)
  // const showTenders = isBalance || form.tenders

  return (
    <FormContext.Provider
      value={{
        config,
        order,
        check,
        form,
        loading,
        errors,
        updateForm,
        login,
        logout,
      }}
    >
      <form
        id="checkout-form"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <CheckoutCustomer />
        <CheckoutDetails />
        {isDelivery && <CheckoutAddress />}
        <CheckoutDiscounts />
        <CheckoutPromoCodes />
        {hasGiftCardTender && <CheckoutGiftCards />}
        <CheckoutTenders />
        <div className="form__footer">
          <input
            className="btn btn--big"
            type="submit"
            value="Submit Order"
            disabled={isWorking || !isPaid}
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
  loading: propTypes.string,
  errors: propTypes.object,
  updateForm: propTypes.func,
  login: propTypes.func,
  logout: propTypes.func,
}

export default CheckoutForm
