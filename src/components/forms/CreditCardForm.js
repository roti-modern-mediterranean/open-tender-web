import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  getCardType,
  formatCardField,
  formatCard,
  validateCreditCard,
} from '@open-tender/js'
import { ButtonSubmit } from '@open-tender/components'

import { FormSubmit, Input, Switch } from '../inputs'
import { CreditCard as CreditCardIcon, Calendar, MapMarker } from '../icons'
import { CreditCard } from '..'

const fields = [
  {
    icon: <CreditCardIcon />,
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
    icon: <CreditCardIcon />,
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

const initState = {
  acct: '',
  exp: '',
  cvv: '',
  zip: '',
  save: true,
}

const CreditCardFormWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-of-type {
    width: 22rem;
    margin: 0 auto 2rem;
  }
`

const CreditCardFormView = styled('form')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  label {
    flex: 0 0 33.33333%;

    &:nth-of-type(1),
    &:nth-of-type(5) {
      flex: 0 0 100%;
    }

    &:nth-of-type(3) {
      flex: 0 0 28.33333%;
      margin: 0 2.5%;
    }
  }
`

const CreditCardForm = ({ apply, remove, init, tenderErrors, hideSave }) => {
  const [initCard, initCardType] = formatCard(init)
  const submitRef = useRef(null)
  const [data, setData] = useState(initCard || initState)
  const [cardType, setCardType] = useState(initCardType || null)
  const [applied, setApplied] = useState(initCard ? true : false)
  const [errors, setErrors] = useState({})
  const showSave = hideSave === undefined || hideSave === null

  useEffect(() => {
    if (tenderErrors) {
      remove()
      setApplied(false)
      setErrors(tenderErrors)
    }
  }, [tenderErrors, remove])

  const handleChange = (evt) => {
    let { id, checked, value } = evt.target
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
    }
    if (id === 'save') {
      value = checked
    } else {
      value = formatCardField(id, value)
    }
    setData({ ...data, [id]: value })
  }

  const applyCard = (evt) => {
    evt.preventDefault()
    const cardData = showSave ? data : { ...data, save: hideSave }
    console.log(cardData)
    const { card, errors } = validateCreditCard(cardData, cardType)
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
    submitRef.current.blur()
  }

  return (
    <CreditCardFormWrapper>
      <div>
        <CreditCard card={data} cardType={cardType} applied={applied} />
      </div>
      <CreditCardFormView
        id="credit-card-form"
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
          />
        ))}
        {showSave && (
          <Switch
            label="Save card?"
            name="save"
            value={data.save || false}
            onChange={handleChange}
            disabled={applied}
          />
        )}
        <FormSubmit style={{ margin: '1.5rem 0 0' }}>
          <ButtonSubmit size="big" color="secondary" submitRef={submitRef}>
            {applied ? 'Remove' : 'Apply'}
          </ButtonSubmit>
        </FormSubmit>
      </CreditCardFormView>
    </CreditCardFormWrapper>
  )
}

CreditCardForm.displayName = 'CreditCardForm'
CreditCardForm.propTypes = {
  apply: propTypes.func,
  remove: propTypes.func,
  init: propTypes.object,
}

export default CreditCardForm
