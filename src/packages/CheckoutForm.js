import React, { useState, useRef, createContext, useEffect } from 'react'
import propTypes from 'prop-types'
import CheckoutDetails from './CheckoutDetails'
import CheckoutCustomer from './CheckoutCustomer'
import CheckoutAddress from './CheckoutAddress'
import CheckoutDiscounts from './CheckoutDiscounts'
import CheckoutPromoCodes from './CheckoutPromoCodes'
import CheckoutGiftCards from './CheckoutGiftCards'
import CheckoutTenders from './CheckoutTenders'
import { checkAmountRemaining } from './utils/cart'
import { isEmpty } from './utils/helpers'

export const FormContext = createContext(null)

const adjustTenders = (tenders, isPaid, amountRemaining, updateForm) => {
  if (!tenders.length || isPaid) return
  const gift = tenders.filter((i) => i.tender_type === 'GIFT_CARD')
  const nonGift = tenders.filter((i) => i.tender_type !== 'GIFT_CARD')
  if (amountRemaining > 0) {
    if (!nonGift.length) return
    const newTenders = nonGift.map((i) => {
      const newAmount = parseFloat(i.amount) + amountRemaining
      amountRemaining = 0.0
      return { ...i, amount: newAmount.toFixed(2) }
    })
    updateForm({ tenders: [...gift, ...newTenders] })
    isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
  } else {
    const newTenders = nonGift.map((i) => {
      const newAmount = Math.max(parseFloat(i.amount) + amountRemaining, 0.0)
      amountRemaining += parseFloat(i.amount) - newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
    if (isPaid) {
      const nonZero = newTenders.filter((i) => i.amount !== '0.00')
      updateForm({ tenders: [...gift, ...nonZero] })
    } else {
      const newGift = gift.map((i) => {
        const newAmount = Math.max(parseFloat(i.amount) + amountRemaining, 0.0)
        amountRemaining += parseFloat(i.amount) - newAmount
        return { ...i, amount: newAmount.toFixed(2) }
      })
      const allNew = [...newGift, ...newTenders].filter(
        (i) => i.amount !== '0.00'
      )
      updateForm({ tenders: allNew })
      isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
    }
  }
}

const CheckoutForm = ({
  config,
  order,
  tz,
  check,
  form,
  loading,
  errors,
  updateForm,
  submitOrder,
  login,
  logout,
  updateRequestedAt,
  updateLocation,
  updateServiceType,
}) => {
  const [isWorking, setIsWorking] = useState(false)
  const submitButton = useRef()
  const { total } = check ? check.totals : 0.0
  const { tenders } = form
  let amountRemaining = checkAmountRemaining(total, tenders)
  let isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'

  useEffect(() => {
    adjustTenders(tenders, isPaid, amountRemaining, updateForm)
  }, [tenders, isPaid, amountRemaining, updateForm])

  useEffect(() => {
    if (!isEmpty(errors)) setIsWorking(false)
  }, [errors])

  if (!check || !check.config) return null

  const isDelivery = order.serviceType === 'DELIVERY'
  const hasGiftCardTender = check.config.tender_types.includes('GIFT_CARD')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
    submitOrder()
    submitButton.current.blur()
  }

  return (
    <FormContext.Provider
      value={{
        config,
        order,
        tz,
        check,
        form,
        loading,
        errors,
        updateForm,
        submitOrder,
        login,
        logout,
        updateRequestedAt,
        updateLocation,
        updateServiceType,
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
          <div className="form__message">
            {!isPaid ? (
              <p className="ot-alert-color">
                There is a balance of ${amountRemaining.toFixed(2)} remaining on
                your order. Please add a payment above.
              </p>
            ) : (
              <p className="ot-success-color">
                Your order can now be submitted. Go for it!
              </p>
            )}
          </div>
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
  submitOrder: propTypes.func,
  login: propTypes.func,
  logout: propTypes.func,
}

export default CheckoutForm
