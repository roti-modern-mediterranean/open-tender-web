import React, { useState, useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import debounce from 'lodash/debounce'
import {
  ButtonLocation,
  ButtonServiceType,
  ButtonRequestedAt,
  Toggle,
  Input,
} from './index'
import { serviceTypeNamesMap } from './constants'

const CheckoutLine = ({ label, action }) => {
  return (
    <div className="form__line border-color">
      <div className="form__line__label">{label}</div>
      <div className="form__line__value">{action}</div>
    </div>
  )
}

const CheckoutDetails = ({
  title = 'Order Details',
  order,
  requiredFields,
  checkoutDetails,
  updateCheck,
}) => {
  const serviceTypeName = serviceTypeNamesMap[order.serviceType]
  const [details, setDetails] = useState(checkoutDetails)

  useEffect(() => {
    setDetails(checkoutDetails)
  }, [checkoutDetails])

  const debouncedUpdate = useCallback(
    debounce((newDetails) => updateCheck({ details: newDetails }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    const field = id.replace('details-', '')
    const newDetails = { ...details, [field]: inputValue }
    setDetails(newDetails)
    debouncedUpdate(newDetails)
  }

  const errors = {}
  const eatingUtensilsRequired = requiredFields.includes('eating_utensils')
  const servingUtensilsRequired = requiredFields.includes('serving_utensils')
  const personCountRequired = requiredFields.includes('person_count')
  return (
    <div className="form__fieldset">
      {/* <div className="form__legend heading ot-font-size-h5">{title}</div> */}
      <div className="form__inputs">
        <CheckoutLine
          label="Location"
          action={<ButtonLocation classes="btn--header" />}
        />
        <CheckoutLine
          label="Service Type"
          action={<ButtonServiceType classes="btn--header" />}
        />
        <CheckoutLine
          label={`${serviceTypeName} Time`}
          action={<ButtonRequestedAt classes="btn--header" />}
        />
        {eatingUtensilsRequired && (
          <CheckoutLine
            label="Eating Utensils"
            action={
              <Toggle
                label="Eating Utensils"
                id="details-eating_utensils"
                on={details.eating_utensils}
                handleChange={handleChange}
              />
            }
          />
        )}
        {servingUtensilsRequired && (
          <CheckoutLine
            label="Serving Utensils"
            action={
              <Toggle
                label="Serving Utensils"
                id="details-serving_utensils"
                on={details.serving_utensils}
                handleChange={handleChange}
              />
            }
          />
        )}
        {personCountRequired && (
          <CheckoutLine
            label="No. of People"
            action={
              <Input
                label="Person Count"
                name="details-person_count"
                type="text"
                value={details.person_count}
                onChange={handleChange}
                error={errors.person_count}
                required={true}
                classes="form__input--small"
                inputClasses="font-size-small"
                showLabel={false}
              />
            }
          />
        )}
      </div>
    </div>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
CheckoutDetails.propTypes = {
  title: propTypes.string,
  order: propTypes.object,
  requiredFields: propTypes.array,
  checkoutDetails: propTypes.object,
  updateCheck: propTypes.func,
}

export default CheckoutDetails
