import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerAddresses,
  updateCustomerAddress,
  resetCustomerAddressesError,
} from 'open-tender-redux'
import { Input, Textarea, Switch } from 'open-tender'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'

const fields = [
  { label: 'Company', name: 'company', type: 'text' },
  { label: 'Contact Person', name: 'contact', type: 'text' },
  { label: 'Contact Phone', name: 'phone', type: 'tel' },
  { label: 'Description', name: 'description', type: 'text' },
  { label: 'Notes', name: 'notes', type: 'textarea' },
  { label: 'Is Default', name: 'is_default', type: 'checkbox' },
]

const AddressModal = ({ windowRef, address }) => {
  const submitButton = useRef()
  const dispatch = useDispatch()
  const [data, setData] = useState(address)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { loading, error } = useSelector(selectCustomerAddresses)

  useEffect(() => {
    return () => dispatch(resetCustomerAddressesError())
  }, [dispatch])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) {
      setErrors(error)
      windowRef.current.scrollTop = 0
    }
  }, [loading, error, windowRef])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const updatedData = { ...data }
    delete updatedData.customer_address_id
    delete updatedData.created_at
    delete updatedData.last_used_at
    const addressId = data.customer_address_id
    const callback = () => dispatch(closeModal())
    dispatch(updateCustomerAddress(addressId, updatedData, callback))
    submitButton.current.blur()
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={() => dispatch(closeModal())} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Update this address
          </p>
        </div>
        <div className="modal__body">
          <form
            id="address-form"
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
              {fields.map((field) => {
                switch (field.type) {
                  case 'textarea':
                    return (
                      <Textarea
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={data[field.name]}
                        onChange={handleChange}
                        error={errors[field.name]}
                        required={field.required}
                      />
                    )
                  case 'checkbox':
                    return (
                      <Switch
                        key={field.name}
                        label={field.label}
                        id={field.name}
                        on={data[field.name]}
                        onChange={handleChange}
                      />
                    )

                  default:
                    return (
                      <Input
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={data[field.name]}
                        onChange={handleChange}
                        error={errors[field.name]}
                        required={field.required}
                      />
                    )
                }
              })}
            </div>
            <div className="form__submit">
              <input
                className="btn"
                type="submit"
                value="Submit Updates"
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

AddressModal.displayName = 'AddressModal'
AddressModal.propTypes = {
  address: propTypes.object,
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default AddressModal
