import React, { useContext, useState, useEffect } from 'react'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'

const CheckoutDiscountLabel = ({ discount }) => (
  <>
    <span className="font-size">{discount.name}</span>
    <span className="font-size-small">{discount.description}</span>
  </>
)

const CheckoutDiscounts = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, loading, updateForm } = formContext
  const [pendingDiscount, setPendingDiscount] = useState(null)

  useEffect(() => {
    if (loading !== 'pending') setPendingDiscount(null)
  }, [loading])

  const discountsOptional = check.discounts_optional.length
    ? check.discounts_optional
    : null
  if (!discountsOptional) return null

  const applyDiscount = (evt, discountId, extId) => {
    evt.preventDefault()
    setPendingDiscount(discountId)
    const newDiscount = { discount_id: discountId, ext_id: extId || '' }
    updateForm({ discounts: [...form.discounts, newDiscount] })
    evt.target.blur()
  }

  const removeDiscount = (evt, discountId) => {
    evt.preventDefault()
    const filtered = form.discounts.filter((i) => i.discount_id !== discountId)
    updateForm({ discounts: filtered })
    evt.target.blur()
  }

  const discountIds = form.discounts.map((i) => i.discount_id)
  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">
          {config.discounts.title}
        </p>
        <p className="form__legend__subtitle">{config.discounts.subtitle}</p>
      </div>
      <div className="form__inputs">
        {discountsOptional.map((i) => {
          const isApplied = discountIds.includes(i.discount_id)
          const isPending = i.discount_id === pendingDiscount
          return (
            <CheckoutLineItem
              key={i.discount_id}
              label={<CheckoutDiscountLabel discount={i} />}
            >
              <div className="form__line__wrapper">
                {isApplied && (
                  <span className="form__line__success">
                    <CircleLoader complete={!isPending} />
                  </span>
                )}
                {isApplied ? (
                  <Button
                    text="Remove Discount"
                    ariaLabel={`Remove ${i.name} discount of ${i.amount}`}
                    icon="XCircle"
                    classes="btn--header"
                    disabled={isPending}
                    onClick={(evt) => removeDiscount(evt, i.discount_id)}
                  />
                ) : (
                  <Button
                    text="Apply Discount"
                    ariaLabel={`Apply ${i.name} discount of ${i.amount}`}
                    icon="PlusCircle"
                    classes="btn--header"
                    onClick={(evt) =>
                      applyDiscount(evt, i.discount_id, i.ext_id)
                    }
                  />
                )}
              </div>
            </CheckoutLineItem>
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutDiscounts.displayName = 'CheckoutDiscounts'

export default CheckoutDiscounts
