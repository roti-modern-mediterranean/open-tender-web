import React, { useState, useRef, useEffect } from 'react'
// import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeFormErrors,
  getCardType,
  makeAcctNumber,
  validateCreditCard,
} from 'open-tender-js'
import { Input } from 'open-tender'
import { closeModal } from '../../slices/modalSlice'
import {
  selectToken,
  addCustomerCreditCard,
  selectCustomerCreditCards,
} from '../../slices/customerSlice'
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

const CreditCardModal = () => {
  const submitButton = useRef()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [cardType, setCardType] = useState('OTHER')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const token = useSelector(selectToken)
  const { loading, error } = useSelector(selectCustomerCreditCards)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(makeFormErrors(error))
  }, [loading, error])

  const handleClose = () => {
    dispatch(closeModal())
  }

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
    } else {
      setSubmitting(true)
      const newCard = {
        token,
        data: card,
        callback: () => dispatch(closeModal()),
      }
      dispatch(addCustomerCreditCard(newCard))
    }
    submitButton.current.blur()
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={handleClose} />
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

export default CreditCardModal
