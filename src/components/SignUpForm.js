import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'open-tender'
import {
  selectSignUp,
  signUpCustomer,
  resetSignUp,
} from '../slices/customerSlice'
import { makeFormErrors } from 'open-tender-js'
import SubmitButton from './SubmitButton'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Password', name: 'password', type: 'password', required: true },
  { label: 'Phone', name: 'phone', type: 'tel', required: true },
  // { label: 'Company', name: 'company', type: 'text' },
]

const SignUpForm = () => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const submitButton = useRef()
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectSignUp)

  useEffect(() => {
    return () => {
      setData({})
      setErrors({})
      dispatch(resetSignUp())
    }
  }, [dispatch])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(makeFormErrors(error))
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    setSubmitting(true)
    dispatch(signUpCustomer(data))
    submitButton.current.blur()
  }

  return (
    <form id="signup-form" className="form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form__error form__error--top form-error">
          There are one or more errors below.
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
            onChange={handleChange}
            error={errors ? errors[field.name] : ''}
            required={field.required}
          />
        ))}
      </div>
      <div className="form__submit">
        <SubmitButton submitRef={submitButton} submitting={submitting} />
      </div>
    </form>
  )
}

SignUpForm.displayName = 'SignUpForm'

export default SignUpForm
