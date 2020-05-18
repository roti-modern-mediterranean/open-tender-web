import React, { useContext, useState, useEffect } from 'react'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'
import { Input } from './Inputs'

const CheckoutPromoCodes = () => {
  const [promoCode, setPromoCode] = useState('')
  const [pendingPromoCode, setPendingPromoCode] = useState(null)
  const formContext = useContext(FormContext)
  const { config, check, form, loading, errors, updateForm } = formContext
  const { promo_codes: checkPromoCodes } = check
  const { email } = form.customer || {}

  useEffect(() => {
    if (loading !== 'pending') setPendingPromoCode(null)
    if (checkPromoCodes.includes(promoCode)) setPromoCode('')
  }, [loading, checkPromoCodes, promoCode])

  const handleChange = (evt) => {
    setPromoCode(evt.target.value)
  }

  const applyPromoCode = (evt) => {
    evt.preventDefault()
    setPendingPromoCode(promoCode)
    updateForm({ promoCodes: [...form.promoCodes, promoCode] })
    evt.target.blur()
  }

  const removePromoCode = (evt, promoCode) => {
    evt.preventDefault()
    setPendingPromoCode(promoCode)
    const filtered = form.promoCodes.filter((i) => i !== promoCode)
    updateForm({ promoCodes: filtered })
    evt.target.blur()
  }

  const newLabel = checkPromoCodes.length
    ? 'Add another promo code'
    : 'Enter a promo code'
  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">
          {config.promoCodes.title}
        </p>
        {config.promoCodes.subtitle && (
          <p className="form__legend__subtitle">{config.promoCodes.subtitle}</p>
        )}
      </div>
      <div className="form__inputs">
        {checkPromoCodes.map((checkPromoCode) => {
          return (
            <CheckoutLineItem label={checkPromoCode}>
              <div className="form__line__wrapper">
                {pendingPromoCode === checkPromoCode && (
                  <span className="form__line__success">
                    <CircleLoader complete={false} />
                  </span>
                )}
                <Button
                  text="Remove Promo Code"
                  ariaLabel={`Remove promo code ${checkPromoCode}`}
                  icon="XCircle"
                  classes="btn--header"
                  onClick={(evt) => removePromoCode(evt, checkPromoCode)}
                />
              </div>
            </CheckoutLineItem>
          )
        })}
        {!email ? (
          <CheckoutLineItem
            label="Please add a valid email address before adding a promo code"
            classes="form__line__input"
          />
        ) : (
          <CheckoutLineItem label={newLabel}>
            <div className="form__line__wrapper">
              <span className="form__line__success">
                {pendingPromoCode === promoCode ? (
                  <CircleLoader complete={false} />
                ) : (
                  <Button
                    text="Apply"
                    ariaLabel="Apply"
                    icon="PlusCircle"
                    classes="btn--header"
                    onClick={applyPromoCode}
                    disabled={!promoCode}
                  />
                )}
              </span>
              <Input
                label={`${newLabel}`}
                name="new_promo_code"
                type="text"
                value={promoCode}
                onChange={handleChange}
                error={errors.promo_code}
                required={false}
                classes="form__input--small"
                inputClasses=""
                showLabel={false}
              />
            </div>
          </CheckoutLineItem>
        )}
      </div>
    </fieldset>
  )
}

CheckoutPromoCodes.displayName = 'CheckoutPromoCodes'

export default CheckoutPromoCodes
