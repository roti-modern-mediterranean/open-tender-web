import React, { useContext, useState, useEffect } from 'react'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'
import { Input } from './Inputs'
import ButtonClear from './ButtonClear'

const CheckoutPromoCodes = () => {
  const [promoCode, setPromoCode] = useState('')
  const [pendingPromoCode, setPendingPromoCode] = useState(null)
  const formContext = useContext(FormContext)
  const { config, check, form, loading, errors, updateForm } = formContext
  const checkPromoCodes = check.discounts.filter((i) => i.is_promo_code)
  const { email } = form.customer || {}
  const promoCodeErrors = errors ? errors.promo_codes || null : null
  const promoCodeError = promoCodeErrors ? promoCodeErrors.promo_code : null

  useEffect(() => {
    if (loading !== 'pending') setPendingPromoCode(null)
    if (checkPromoCodes.includes(promoCode)) setPromoCode('')
    // if (promoCodeError) updateForm({ promoCodes: checkPromoCodes })
  }, [loading, checkPromoCodes, promoCode])

  const handleChange = (evt) => {
    setPromoCode(evt.target.value)
  }

  const applyPromoCode = (evt) => {
    evt.preventDefault()
    setPendingPromoCode(promoCode)
    updateForm({ promoCodes: [...checkPromoCodes, promoCode] })
    evt.target.blur()
  }

  const removePromoCode = (evt, promoCode) => {
    evt.preventDefault()
    setPendingPromoCode(promoCode)
    const filtered = form.promoCodes.filter((i) => i !== promoCode)
    updateForm({ promoCodes: filtered })
    evt.target.blur()
  }

  const removePendingPromoCode = (evt) => {
    evt.preventDefault()
    setPromoCode('')
    setPendingPromoCode(null)
    if (form.promoCodes.length > checkPromoCodes.length) {
      updateForm({ promoCodes: checkPromoCodes })
    }
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
        {!email ? (
          <p className="form__legend__subtitle">
            Please add a valid email address before adding a promo code
          </p>
        ) : (
          config.promoCodes.subtitle && (
            <p className="form__legend__subtitle">
              {config.promoCodes.subtitle}
            </p>
          )
        )}
      </div>
      <div className="form__inputs">
        {checkPromoCodes.map((checkPromoCode) => {
          return (
            <CheckoutLineItem key={checkPromoCode} label={checkPromoCode}>
              <div className="form__line__wrapper">
                <span className="form__line__success">
                  <CircleLoader complete={true} />
                </span>
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
        {email && (
          <CheckoutLineItem
            label={
              <Input
                label={`${newLabel}`}
                name="promo_code"
                type="text"
                placeholder="enter a promo code"
                value={promoCode}
                onChange={handleChange}
                // error={promoCodeErrors.promo_code}
                error={null}
                required={false}
                classes="form__input--small"
                inputClasses=""
                showLabel={false}
              >
                {' '}
                {promoCode.length ? (
                  <ButtonClear
                    ariaLabel={`Remove promo code ${promoCode}`}
                    onClick={(evt) => removePendingPromoCode(evt)}
                  />
                ) : null}
              </Input>
            }
            classes="form__line__promo"
            error={promoCodeError}
          >
            <div className="form__line__wrapper">
              {pendingPromoCode === promoCode && (
                <span className="form__line__success">
                  <CircleLoader complete={false} />
                </span>
              )}
              <Button
                text="Apply Promo Code"
                ariaLabel="Apply Promo Code"
                icon="PlusCircle"
                classes="btn--header"
                onClick={applyPromoCode}
                disabled={!promoCode || pendingPromoCode === promoCode}
              />
              {/* <Input
                label={`${newLabel}`}
                name="promo_code"
                type="text"
                value={promoCode}
                onChange={handleChange}
                // error={promoCodeErrors.promo_code}
                error={null}
                required={false}
                classes="form__input--small"
                inputClasses=""
                showLabel={false}
              >
                {' '}
                {promoCode.length ? (
                  <Button
                    text=""
                    ariaLabel={`Remove promo code ${promoCode}`}
                    icon="XCircle"
                    classes="btn-link"
                    onClick={(evt) => removePendingPromoCode(evt)}
                  />
                ) : null}
              </Input> */}
            </div>
          </CheckoutLineItem>
        )}
      </div>
    </fieldset>
  )
}

CheckoutPromoCodes.displayName = 'CheckoutPromoCodes'

export default CheckoutPromoCodes
