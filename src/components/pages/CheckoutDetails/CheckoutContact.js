import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { makePhone, isEmpty } from '@open-tender/js'
import {
  selectCustomer,
  selectCheckout,
  updateForm,
  logoutCustomer,
} from '@open-tender/redux'

import { FormHeader, Input } from '../../inputs'
import { Mail, Phone, User, UserId } from '../../icons'
import { useCallback, useEffect, useState } from 'react'
import { InlineLink } from '../..'
import { useHistory } from 'react-router-dom'

const iconMap = {
  name: <UserId />,
  email: <Mail />,
  phone: <Phone />,
  company: <User />,
}

const fields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    included: true,
    required: true,
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    required: true,
  },
]

let companyField = {
  label: 'Company',
  name: 'company',
  type: 'text',
  required: false,
}

const CheckoutContactView = styled('div')`
  margin: 0 0 3rem;
`

const makeContact = (customer) => {
  const {
    first_name = '',
    last_name = '',
    email = '',
    phone = '',
    company = '',
  } = customer || {}
  const name = `${first_name} ${last_name}`.replace(/\s+$/, '')
  return {
    name,
    email,
    phone,
    company,
  }
}

const convertErrors = (errors) => {
  const { first_name, last_name } = errors
  const name =
    first_name || last_name ? 'Please enter both a first and last name' : null
  return name ? { name, ...errors } : errors
}

const CheckoutContact = ({ errors = {} }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { profile } = useSelector(selectCustomer)
  const { customer_id, first_name, last_name, email, phone, company } =
    profile || {}
  const { check, form } = useSelector(selectCheckout)
  const [contact, setContact] = useState(makeContact(form.customer))
  const config = check ? check.config : {}
  const required = config.required ? config.required.customer : []
  const displayed = config.displayed ? config.displayed.customer : []
  const showCompany =
    displayed.includes('company') || required.includes('company')
  if (required.includes('company')) companyField.required = true
  const missingCompany = first_name && companyField.required && !company
  const formFields = missingCompany
    ? [companyField]
    : showCompany
    ? [...fields, companyField]
    : fields
  const formErrors = convertErrors(errors)
  const emptyCustomer = !form.customer || isEmpty(form.customer)
  const replaceGuest =
    !emptyCustomer && !form.customer.customer_id && customer_id

  useEffect(() => {
    if ((emptyCustomer && first_name) || replaceGuest) {
      const customer = {
        customer_id,
        first_name,
        last_name,
        email,
        phone,
        company,
      }
      setContact(makeContact(customer))
      dispatch(updateForm({ customer }))
    }
  }, [
    dispatch,
    emptyCustomer,
    replaceGuest,
    customer_id,
    first_name,
    last_name,
    email,
    phone,
    company,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((customer) => dispatch(updateForm({ customer })), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const val = id === 'phone' ? makePhone(value) : value
    let customer
    if (id === 'name') {
      const [first_name = '', last_name = ''] = val
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
      customer = { ...form.customer, first_name, last_name }
    } else {
      customer = { ...form.customer, [id]: val }
    }
    const data = { ...contact, [id]: val }
    setContact(data)
    debouncedUpdate(customer)
  }

  const logout = () => {
    dispatch(logoutCustomer()).then(() => {
      const customer = {}
      setContact(customer)
      dispatch(updateForm({ customer }))
    })
  }

  const update = () => {
    history.push('/profile')
  }

  const login = () => {
    history.push('/checkout/login')
  }

  return (
    <CheckoutContactView>
      <FormHeader>
        <h2>Contact Info</h2>
        {profile ? (
          <p>
            <InlineLink onClick={logout}>Logout</InlineLink> or{' '}
            <InlineLink onClick={update}>update your contact info</InlineLink>.
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <InlineLink onClick={login}>Login here</InlineLink>
          </p>
        )}
      </FormHeader>
      {formFields.map((field) => (
        <Input
          key={field.name}
          icon={iconMap[field.name]}
          label={field.label}
          name={field.name}
          type={field.type}
          value={contact[field.name] || ''}
          onChange={handleChange}
          error={formErrors[field.name]}
          required={field.required}
          autoComplete={field.autoComplete}
          disabled={!!profile && !missingCompany}
        />
      ))}
    </CheckoutContactView>
  )
}

CheckoutContact.displayName = 'CheckoutContact'
CheckoutContact.propTypes = {
  errors: propTypes.object,
}

export default CheckoutContact
