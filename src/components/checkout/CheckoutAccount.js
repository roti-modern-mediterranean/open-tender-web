import React, { useState, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import { Button, ButtonCheckoutAccount, Input } from 'open-tender'
import { selectCustomerAccount } from '../../slices/customerSlice'
import { FormContext } from './CheckoutForm'
import { CheckoutLineItem } from '.'

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
  const account = useSelector(selectCustomerAccount)
  const history = useHistory()
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

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const errors = {}
  const requiredFields = check.config.required.customer
  const accountConfig = makeAccountConfig(requiredFields)
  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h3">
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
          <ButtonCheckoutAccount
            customer={account}
            goToAccount={handleAccount}
            classes="btn--header"
          />
        </CheckoutLineItem>
        {fields.map((field) => {
          const input = accountConfig[field.name]
          return (
            input &&
            input.included && (
              <Input
                key={field.name}
                label={input.label}
                name={`customer-${field.name}`}
                type={field.type}
                value={customer[field.name]}
                onChange={handleChange}
                error={errors[field.name]}
                required={input.required}
              />
            )
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutAccount.displayName = 'CheckoutAccount'

export default CheckoutAccount
