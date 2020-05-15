import React from 'react'
import propTypes from 'prop-types'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'

const CheckoutDiscountLabel = ({ discount }) => (
  <>
    <span className="font-size">{discount.name}</span>
    <span className="font-size-small">{discount.description}</span>
  </>
)

const CheckoutDiscounts = ({
  title = 'Redeem your loyalty rewards',
  discountsOptional,
  discounts,
  updateDiscounts,
}) => {
  const discountIds = discounts.map((i) => i.discount_id)

  const applyDiscount = (evt, discountId, extId) => {
    evt.preventDefault()
    const newDiscount = { discount_id: discountId, ext_id: extId || '' }
    updateDiscounts([...discounts, newDiscount])
    evt.target.blur()
  }

  const removeDiscount = (evt, discountId) => {
    evt.preventDefault()
    updateDiscounts(discounts.filter((i) => i.discount_id !== discountId))
    evt.target.blur()
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">{title}</p>
        <p className="form__legend__subtitle">
          Apply one or more discounts below.
        </p>
      </div>
      <div className="form__inputs">
        {discountsOptional.map((i) => (
          <CheckoutLineItem
            key={i.discount_id}
            label={<CheckoutDiscountLabel discount={i} />}
          >
            {discountIds.includes(i.discount_id) ? (
              <Button
                text="Remove Discount"
                ariaLabel={`Remove ${i.name} discount of ${i.amount}`}
                icon="XCircle"
                classes="btn--header"
                onClick={(evt) => removeDiscount(evt, i.discount_id)}
              />
            ) : (
              <Button
                text="Apply Discount"
                ariaLabel={`Apply ${i.name} discount of ${i.amount}`}
                icon="PlusCircle"
                classes="btn--header"
                onClick={(evt) => applyDiscount(evt, i.discount_id, i.ext_id)}
              />
            )}
          </CheckoutLineItem>
        ))}
      </div>
    </fieldset>
  )
}

CheckoutDiscounts.displayName = 'CheckoutDiscounts'
CheckoutDiscounts.propTypes = {
  customer: propTypes.object,
  updateCheck: propTypes.func,
  requiredFields: propTypes.array,
}

export default CheckoutDiscounts
