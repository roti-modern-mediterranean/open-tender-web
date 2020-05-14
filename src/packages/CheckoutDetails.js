import React, { useState, useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import debounce from 'lodash/debounce'
import {
  ButtonLocation,
  ButtonServiceType,
  ButtonRequestedAt,
  Input,
  Switch,
} from './index'
import { serviceTypeNamesMap } from './constants'
import { Textarea } from './Inputs'
import CheckoutLineItem from './CheckoutLineItem'

const CheckoutDetails = ({
  title = 'Please review your order details',
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
  const notesRequired = requiredFields.includes('notes')
  return (
    <div className="form__fieldset">
      <div className="form__legend heading ot-font-size-h5">{title}</div>
      <div className="form__inputs">
        <CheckoutLineItem label="Location">
          <ButtonLocation classes="btn--header" />
        </CheckoutLineItem>
        <CheckoutLineItem label="Service Type">
          <ButtonServiceType classes="btn--header" />
        </CheckoutLineItem>
        <CheckoutLineItem label={`${serviceTypeName} Time`}>
          <ButtonRequestedAt classes="btn--header" />
        </CheckoutLineItem>
        {eatingUtensilsRequired && (
          <CheckoutLineItem label="Eating Utensils">
            <Switch
              label="Eating Utensils"
              id="details-eating_utensils"
              on={details.eating_utensils}
              onChange={handleChange}
            />
          </CheckoutLineItem>
        )}
        {servingUtensilsRequired && (
          <CheckoutLineItem label="Serving Utensils">
            <Switch
              label="Serving Utensils"
              id="details-serving_utensils"
              on={details.serving_utensils}
              handleChange={handleChange}
            />
          </CheckoutLineItem>
        )}
        {personCountRequired && (
          <CheckoutLineItem label="No. of People">
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
          </CheckoutLineItem>
        )}
        {notesRequired && (
          <CheckoutLineItem label="Notes" classes="-textarea">
            <Textarea
              label="Notes"
              name="details-notes"
              value={details.notes}
              onChange={handleChange}
              error={errors.notes}
              required={true}
              classes="form__input--small -textarea"
              inputClasses="font-size-small"
              showLabel={false}
            />
          </CheckoutLineItem>
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
