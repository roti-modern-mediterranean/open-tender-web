import React, { useState, useCallback, useContext } from 'react'
import { Input } from './Inputs'
import CheckoutLineItem from './CheckoutLineItem'
import debounce from 'lodash/debounce'
import ButtonCheckoutAccount from './ButtonCheckoutAccount'
import Button from './Button'
import { FormContext } from './CheckoutForm'

const makeAccountConfig = (requiredFields) => {
  return {
    phone: { label: 'Phone', included: true, required: true },
    company: {
      label: 'Company',
      included: requiredFields.includes('company'),
      required: requiredFields.includes('company'),
    },
  }
}

const fields = [
  { name: 'first_name', type: 'text' },
  { name: 'last_name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
  { name: 'company', type: 'text' },
]

const CheckoutAccount = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, updateForm, logout } = formContext
  const [customer, setCustomer] = useState(form.customer)

  const debouncedUpdate = useCallback(
    debounce((newCustomer) => updateForm({ customer: newCustomer }), 500),
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
  const requiredFields = check.config.required_fields.customer
  const accountConfig = makeAccountConfig(requiredFields)
  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">
          {config.account.title}
          {/* {customer.first_name} */}
        </p>
        <p className="form__legend__subtitle">
          Please verify your account information for your order.{' '}
          <Button
            text="Click here to logout"
            ariaLabel="Log out of your account"
            classes="btn-link"
            onClick={logout}
          />{' '}
          if you want to switch accounts or check out as a guest.
        </p>
      </div>
      <div className="form__inputs">
        <CheckoutLineItem label="Account">
          <ButtonCheckoutAccount classes="btn--header" />
        </CheckoutLineItem>
        {fields.map((field) => {
          return (
            accountConfig[field.name] &&
            accountConfig[field.name].included && (
              <CheckoutLineItem
                key={field.name}
                label={accountConfig[field.name].label}
                required={accountConfig[field.name].required}
                classes="form__line__input"
              >
                <Input
                  label={accountConfig[field.name].label}
                  name={`customer-${field.name}`}
                  type={field.type}
                  value={customer[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={accountConfig[field.name].required}
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

CheckoutAccount.displayName = 'CheckoutAccount'

export default CheckoutAccount
