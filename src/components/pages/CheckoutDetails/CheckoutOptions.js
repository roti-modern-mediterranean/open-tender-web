import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { selectCheckout, updateForm } from '@open-tender/redux'

import { FormHeader, Input, Switch } from '../../inputs'
import { User } from '../../icons'
import CheckoutNotes from './CheckoutNotes'

const iconMap = {
  person_count: <User />,
  tax_exempt_id: <User />,
}

const fields = [
  {
    config: 'count',
    label: 'Person Count',
    name: 'person_count',
    type: 'number',
    pattern: '[0-9]*',
  },
  {
    config: 'taxExempt',
    label: 'Tax Exempt ID',
    name: 'tax_exempt_id',
    type: 'text',
  },
  {
    config: 'eatingUtensils',
    label: 'Eating Utensils',
    name: 'eating_utensils',
    type: 'checkbox',
  },
  {
    config: 'servingUtensils',
    label: 'Serving Utensils',
    name: 'serving_utensils',
    type: 'checkbox',
  },
]

const CheckoutOptionsView = styled('div')`
  margin: 0 0 3rem;
`

const CheckoutOptions = ({ errors = {} }) => {
  const dispatch = useDispatch()
  const { check, form } = useSelector(selectCheckout)
  const [details, setDetails] = useState(form.details)
  const config = check ? check.config : {}
  const required = config.required ? config.required.details : []
  let displayed = config.displayed ? config.displayed.details : []
  if (config.allow_tax_exempt) displayed.push('taxExempt')
  const formFields = fields
    .filter((i) => displayed.includes(i.config) || required.includes(i.config))
    .map((i) => ({ ...i, required: required.includes(i.config) }))
  const showNotes = displayed.includes('notes') || required.includes('notes')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((details) => dispatch(updateForm({ details })), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const val = type === 'checkbox' ? checked : value
    const data = { ...details, [id]: val }
    setDetails(data)
    debouncedUpdate(data)
  }

  return (
    <CheckoutOptionsView>
      {formFields.length > 0 && (
        <FormHeader>
          <h2>Order Details</h2>
        </FormHeader>
      )}
      {formFields.map((field) =>
        field.type === 'checkbox' ? (
          <Switch
            key={field.name}
            label={field.label}
            name={field.name}
            value={details[field.name] || false}
            onChange={handleChange}
          />
        ) : (
          <Input
            key={field.name}
            icon={iconMap[field.name]}
            label={field.label}
            name={field.name}
            type={field.type}
            value={details[field.name] || ''}
            onChange={handleChange}
            error={errors[field.name]}
            required={field.required}
            autoComplete={field.autoComplete}
          />
        )
      )}
      {showNotes && (
        <CheckoutNotes
          notes={details.notes || ''}
          handleChange={handleChange}
        />
      )}
    </CheckoutOptionsView>
  )
}

CheckoutOptions.displayName = 'CheckoutOptions'
CheckoutOptions.propTypes = {
  revenueCenter: propTypes.object,
  setActive: propTypes.func,
  style: propTypes.object,
}

export default CheckoutOptions
