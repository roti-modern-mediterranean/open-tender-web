import React, { useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  getCardType,
  makeAcctNumber,
  makeNumeric,
  validateCreditCard,
} from '@open-tender/js'
import { ButtonSubmit } from '@open-tender/components'

import { FormSubmit, Input, Switch } from '../inputs'
import { CreditCard, Calendar, MapMarker } from '../icons'

const fields = [
  {
    icon: <CreditCard />,
    label: 'Number',
    placeholder: '#### #### #### ####',
    name: 'acct',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-number',
  },
  {
    icon: <Calendar />,
    label: 'MM / YY',
    placeholder: '## / ##',
    name: 'exp',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-exp',
  },
  {
    icon: <CreditCard />,
    label: 'CVV',
    placeholder: '###',
    name: 'cvv',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-csc',
  },
  {
    icon: <MapMarker />,
    label: 'Zip Code',
    placeholder: '#####',
    name: 'zip',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'postal-code',
  },
]

const CreditCardFormView = styled('form')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  label {
    flex: 0 0 33.33333%;

    &:first-of-type,
    &:last-of-type {
      flex: 0 0 100%;
    }

    &:nth-of-type(3) {
      flex: 0 0 28.33333%;
      margin: 0 2.5%;
    }
  }
`

const initState = {
  acct: '',
  exp: '',
  cvv: '',
  zip: '',
  save: true,
}

const CreditCardForm = ({ apply, remove, init }) => {
  console.log(init)
  const submitRef = useRef(null)
  const [data, setData] = useState(init || initState)
  const [cardType, setCardType] = useState(null)
  const [errors, setErrors] = useState({})
  const [applied, setApplied] = useState(false)

  const handleChange = (evt) => {
    let { id, checked, value } = evt.target
    const cleanValue = makeNumeric(value)
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
      value = makeAcctNumber(value, currentType)
    } else if (id === 'exp') {
      value = cleanValue.slice(0, 4)
      if (value.length > 2) {
        value = `${value.slice(0, 2)} / ${value.slice(2, 4)}`
      }
    } else if (id === 'cvv') {
      value = cleanValue.slice(0, 4)
    } else if (id === 'zip') {
      value = cleanValue.slice(0, 5)
    } else if (id === 'save') {
      value = checked
    }
    setData({ ...data, [id]: value })
  }

  const applyCard = (evt) => {
    evt.preventDefault()
    const { card, errors } = validateCreditCard(data, cardType)
    if (errors) {
      setErrors(errors)
    } else {
      apply(card)
      setErrors({})
      setApplied(true)
    }
    submitRef.current.blur()
  }

  const removeCard = (evt) => {
    evt.preventDefault()
    remove()
    setErrors({})
    setApplied(false)
  }

  return (
    <CreditCardFormView
      id="signup-form"
      // ref={formRef}
      onSubmit={applied ? removeCard : applyCard}
      noValidate
    >
      {fields.map((field) => (
        <Input
          key={field.name}
          icon={field.icon}
          label={field.label}
          name={field.name}
          type={field.type}
          pattern={field.pattern}
          autoComplete={field.autoComplete}
          value={data[field.name]}
          placeholder={field.placeholder}
          onChange={handleChange}
          error={errors[field.name]}
          disabled={applied}
          // required={field.required}
        />
      ))}
      <Switch
        label="Save card?"
        name="save"
        value={data.save || false}
        onChange={handleChange}
      />
      <FormSubmit style={{ margin: '1.5rem 0 0' }}>
        <ButtonSubmit size="big" color="secondary" submitRef={submitRef}>
          {applied ? 'Remove' : 'Apply'}
        </ButtonSubmit>
      </FormSubmit>
    </CreditCardFormView>
  )
}

CreditCardForm.displayName = 'CreditCardForm'
CreditCardForm.propTypes = {
  // data: propTypes.object,
  // errors: propTypes.object,
  // update: propTypes.func,
  apply: propTypes.func,
  remove: propTypes.func,
}

export default CreditCardForm
