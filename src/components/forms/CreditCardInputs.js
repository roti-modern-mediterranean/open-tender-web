import React from 'react'
import propTypes from 'prop-types'
import {
  getCardType,
  formatCardField,
  formatCard,
  validateCreditCard,
} from '@open-tender/js'

import { Input } from '../inputs'
import { CreditCard as CreditCardIcon, Calendar, MapMarker } from '../icons'
import { CreditCard, Loading } from '..'
import styled from '@emotion/styled'

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
    label: 'Zip',
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

const CreditCardFormView = styled('div')`
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

const CreditCardInputs = ({ data, errors, update, cardType, setCardType }) => {
  const applied = false

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
    update({ ...data, [id]: value })
  }

  return (
    <CreditCardFormWrapper>
      <div>
        <CreditCard card={data} cardType={cardType} applied={applied} />
      </div>
      <CreditCardFormView>
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
      </CreditCardFormView>
    </CreditCardFormWrapper>
  )
}

CreditCardInputs.displayName = 'CreditCardInputs'
CreditCardInputs.propTypes = {
  data: propTypes.object,
  errors: propTypes.object,
  update: propTypes.func,
  setCardType: propTypes.func,
}

export default CreditCardInputs
