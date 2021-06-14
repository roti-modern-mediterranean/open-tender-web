import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isEmpty } from '@open-tender/js'
import { selectCheckout, updateForm } from '@open-tender/redux'

import { FormHeader, Input, Switch } from '../../inputs'
import { User } from '../../icons'
import CheckoutNotes from './CheckoutNotes'
import CheckoutCurbside from './CheckoutCurbside'

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

const checkEmptyDetails = (form) => {
  if (!form.details || isEmpty(form.details)) return true
  const { person_count, tax_exempt_id, notes, order_fulfillment } = form.details
  return (
    order_fulfillment === undefined &&
    (person_count === null || person_count === undefined) &&
    (tax_exempt_id === null || tax_exempt_id === undefined) &&
    (notes === null || notes === undefined)
  )
}

const CheckoutOptions = ({ errors = {} }) => {
  const dispatch = useDispatch()
  const { check, form } = useSelector(selectCheckout)
  const checkDetails = check ? check.details || {} : {}
  const {
    person_count,
    tax_exempt_id,
    eating_utensils,
    serving_utensils,
    notes,
    order_fulfillment,
    vehicle_type,
    vehicle_color,
  } = checkDetails
  const [details, setDetails] = useState(form.details)
  const config = check ? check.config : {}
  const curbside = config.order_fulfillment
  const required = config.required ? config.required.details : []
  let displayed = config.displayed ? config.displayed.details : []
  if (config.allow_tax_exempt) displayed.push('taxExempt')
  const formFields = fields
    .filter((i) => displayed.includes(i.config) || required.includes(i.config))
    .map((i) => ({ ...i, required: required.includes(i.config) }))
  const showNotes = displayed.includes('notes') || required.includes('notes')
  const emptyDetails = checkEmptyDetails(form)

  useEffect(() => {
    if (emptyDetails && eating_utensils !== undefined) {
      let details = {
        person_count,
        tax_exempt_id,
        eating_utensils,
        serving_utensils,
        notes,
      }
      if (order_fulfillment !== undefined) {
        details = { ...details, order_fulfillment, vehicle_type, vehicle_color }
      }
      setDetails(details)
      dispatch(updateForm({ details }))
    }
  }, [
    dispatch,
    emptyDetails,
    person_count,
    tax_exempt_id,
    eating_utensils,
    serving_utensils,
    notes,
    order_fulfillment,
    vehicle_type,
    vehicle_color,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((details) => dispatch(updateForm({ details })), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const val = type === 'checkbox' ? checked : value
    const data = { ...details, [id]: val }
    if (data.vehicle_type || data.vehicle_color) {
      data.order_fulfillment = true
    } else {
      data.order_fulfillment = false
    }
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
          required={required.includes('notes')}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {curbside && (
        <CheckoutCurbside
          fields={curbside.fields}
          data={details}
          errors={errors}
          handleChange={handleChange}
        />
      )}
    </CheckoutOptionsView>
  )
}

CheckoutOptions.displayName = 'CheckoutOptions'
CheckoutOptions.propTypes = {
  errors: propTypes.object,
}

export default CheckoutOptions
