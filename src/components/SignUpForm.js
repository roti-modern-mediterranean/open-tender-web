import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../packages'
import {
  selectSignUp,
  signUpCustomer,
  resetSignUp,
} from '../slices/customerSlice'
import { makeFormErrors } from '../packages/utils/errors'
import ClipLoader from 'react-spinners/ClipLoader'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text' },
  { label: 'Last Name', name: 'last_name', type: 'text' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Phone', name: 'phone', type: 'tel' },
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
        {/* <input
          className="btn"
          type="submit"
          value={submitting ? 'Submitting...' : 'Submit'}
          disabled={submitting}
          ref={submitButton}
        /> */}
        <button
          className="btn"
          type="submit"
          disabled={submitting}
          ref={submitButton}
        >
          {submitting ? (
            <span>
              <span className="btn__loader">
                <ClipLoader size={14} color={'#ffffff'} />
              </span>
              <span>Submitting...</span>
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  )
}

SignUpForm.displayName = 'SignUpForm'

export default SignUpForm
