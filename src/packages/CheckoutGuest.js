import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { Input } from './Inputs'
import debounce from 'lodash/debounce'

const initialState = {
  first_name: '',
  last_name: '',
  emaiil: '',
  phone: '',
  company: '',
}

const ContactInfo = ({
  updateCheck,
  requiredFields,
  title = 'Checkout as a Guest',
}) => {
  const [customer, setCustomer] = useState(initialState)

  // https://medium.com/p/5489fc3461b3/responses/show
  // https://codesandbox.io/s/functional-component-debounce-cunf7
  const debouncedUpdate = useCallback(
    debounce((newCustomer) => updateCheck({ customer: newCustomer }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('customer-', '')
    const newCustomer = { ...customer, [field]: value }
    setCustomer(newCustomer)
    debouncedUpdate(newCustomer)
  }

  const errors = {}
  const companyRequired = requiredFields.includes('company')
  return (
    <fieldset className="form__fieldset">
      <legend className="form__legend heading ot-font-size-h5">{title}</legend>
      <div className="form__inputs">
        <Input
          label="First Name"
          name="customer-first_name"
          type="text"
          value={customer.first_name}
          onChange={handleChange}
          error={errors.first_name}
          required={true}
          classes="form__input--left"
        />
        <Input
          label="Last Name"
          name="customer-last_name"
          type="text"
          value={customer.last_name}
          onChange={handleChange}
          error={errors.last_name}
          required={true}
          classes="form__input--right"
        />
        <Input
          label="Email"
          name="customer-email"
          type="email"
          value={customer.email}
          onChange={handleChange}
          error={errors.email}
          required={true}
        />
        <Input
          label="Phone"
          name="customer-phone"
          type="tel"
          value={customer.phone}
          onChange={handleChange}
          error={errors.phone}
          required={true}
          classes={`${companyRequired ? 'form__input--left' : ''}`}
        />
        {companyRequired && (
          <Input
            label="Company"
            name="customer-company"
            type="text"
            value={customer.company}
            onChange={handleChange}
            error={errors.company}
            required={true}
            classes="form__input--right"
          />
        )}
      </div>
    </fieldset>
  )
}

ContactInfo.displayName = 'ContactInfo'
ContactInfo.propTypes = {
  updateCheck: propTypes.func,
  requiredFields: propTypes.array,
}

export default ContactInfo
