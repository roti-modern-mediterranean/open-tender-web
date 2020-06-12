import React, { useState, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import { Input } from './Inputs'
import CheckoutLineItem from './CheckoutLineItem'
import { FormContext } from './CheckoutForm'

const initialState = {
  unit: '',
  company: '',
  contact: '',
  phone: '',
}

const makeAddressConfig = (requiredFields) => {
  return {
    unit: {
      label: 'Unit / Suite',
      included: requiredFields.includes('unit'),
      required: requiredFields.includes('unit'),
    },
    company: {
      label: 'Company',
      included: requiredFields.includes('company'),
      required: requiredFields.includes('company'),
    },
    contact: {
      label: 'Contact Person',
      included: requiredFields.includes('contact'),
      required: requiredFields.includes('contact'),
    },
    phone: {
      label: 'Contact Phone',
      included: requiredFields.includes('phone'),
      required: requiredFields.includes('phone'),
    },
  }
}

const fields = [
  { name: 'unit', type: 'text' },
  { name: 'company', type: 'text' },
  { name: 'contact', type: 'text' },
  { name: 'phone', type: 'text' },
]

const CheckoutAddress = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, updateForm } = formContext
  const [address, setAddress] = useState(form.address || initialState)

  const debouncedUpdate = useCallback(
    debounce((newAddress) => updateForm({ address: newAddress }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('address-', '')
    const newAddress = { ...address, [field]: value }
    setAddress(newAddress)
    debouncedUpdate(newAddress)
  }

  const errors = {}
  const requiredFields = check.config.required.address
  const addressConfig = makeAddressConfig(requiredFields)
  return (
    <fieldset className="form__fieldset">
      <legend className="form__legend heading ot-font-size-h5">
        {config.address.title}
      </legend>
      <div className="form__inputs">
        {fields.map((field) => {
          return (
            addressConfig[field.name] &&
            addressConfig[field.name].included && (
              <CheckoutLineItem
                key={field.name}
                label={addressConfig[field.name].label}
                required={addressConfig[field.name].required}
                classes="form__line__input"
              >
                <Input
                  label={addressConfig[field.name].label}
                  name={`address-${field.name}`}
                  type={field.type}
                  value={address[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={addressConfig[field.name].required}
                  classes="form__input--small"
                  inputClasses=""
                  showLabel={false}
                />
              </CheckoutLineItem>
            )
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutAddress.displayName = 'CheckoutAddress'

export default CheckoutAddress
