import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  addCustomerCreditCard,
  resetCustomerCreditCardsError,
  selectCustomerCreditCards,
} from 'open-tender-redux'
import { getCardType, makeAcctNumber, validateCreditCard } from 'open-tender-js'
import { Input } from 'open-tender'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'

const fields = [
  {
    label: 'Card Number',
    placeholder: '#### #### #### ####',
    name: 'acct',
    type: 'text',
  },
  { label: 'Expiration', placeholder: 'MMYY', name: 'exp', type: 'number' },
  { label: 'CVV', placeholder: '###', name: 'cvv', type: 'number' },
  { label: 'Zip Code', placeholder: '#####', name: 'zip', type: 'number' },
]

const CreditCardModal = ({ windowRef }) => {
  const submitButton = useRef()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [cardType, setCardType] = useState('OTHER')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { loading, error } = useSelector(selectCustomerCreditCards)

  useEffect(() => {
    return () => dispatch(resetCustomerCreditCardsError())
  }, [dispatch])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) {
      setErrors(error)
      windowRef.current.scrollTop = 0
    }
  }, [loading, error, windowRef])

  const handleChange = (evt) => {
    let { id, checked, value } = evt.target
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
      value = makeAcctNumber(value, currentType)
    } else if (id === 'exp') {
      value = value.slice(0, 4)
    } else if (id === 'cvv') {
      value = value.slice(0, 4)
    } else if (id === 'zip') {
      value = value.slice(0, 5)
    } else if (id === 'save') {
      value = checked
    }
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { card, errors } = validateCreditCard(data, cardType)
    if (errors) {
      setErrors(errors)
      windowRef.current.scrollTop = 0
    } else {
      setSubmitting(true)
      const callback = () => dispatch(closeModal())
      dispatch(addCustomerCreditCard(card, callback))
    }
    submitButton.current.blur()
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={() => dispatch(closeModal())} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Add a new credit card
          </p>
        </div>
        <div className="modal__body">
          <form
            id="credit-card-form"
            className="form"
            onSubmit={handleSubmit}
            noValidate
          >
            {errors.form && (
              <div className="form__error form__error--top form-error">
                {errors.form}
              </div>
            )}
            <div className="form__inputs">
              {fields.map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={data[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              ))}
            </div>
            <div className="form__submit">
              <input
                className="btn"
                type="submit"
                value={submitting ? 'Authorizing Card...' : 'Add New Card'}
                disabled={submitting}
                ref={submitButton}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

CreditCardModal.displayName = 'CreditCardModal'
CreditCardModal.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default CreditCardModal
