import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectResetPassword,
  resetPassword,
  resetResetPassword,
} from 'open-tender-redux'
import { Input, Button } from 'open-tender'

import { openModal } from '../slices'
import SubmitButton from './SubmitButton'

const fields = [
  { label: 'New Password', name: 'new_password', type: 'password' },
  { label: 'Confirm Password', name: 'confirm', type: 'password' },
]

const ResetPasswordForm = ({ token }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const submitButton = useRef()
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { success, loading, error } = useSelector(selectResetPassword)
  const formError = error ? errors.token || errors.form || '' : ''

  useEffect(() => {
    setData({})
    setErrors({})
    dispatch(resetResetPassword())
    return () => {
      setData({})
      setErrors({})
      dispatch(resetResetPassword())
    }
  }, [dispatch])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { new_password, confirm } = data
    if (!new_password || new_password.length < 8) {
      setErrors({ new_password: 'Must be at least 8 characters' })
    } else if (new_password !== confirm) {
      setErrors({ confirm: 'Passwords do not match' })
    } else {
      setErrors({})
      setSubmitting(true)
      dispatch(resetPassword({ new_password, token }))
    }
    submitButton.current.blur()
  }

  const handleLogin = (evt) => {
    evt.preventDefault()
    const args = {
      type: 'login',
      args: { callback: () => history.push('/account') },
    }
    dispatch(openModal(args))
    evt.target.blur()
  }

  return success ? (
    <div className="password-reset">
      <p>Success! Your password has been reset.</p>
      <p>
        <Button
          classes="btn-link"
          onClick={handleLogin}
          text="Click here to log into your account"
        />
      </p>
    </div>
  ) : (
    <form
      id="reset-password-form"
      className="form"
      onSubmit={handleSubmit}
      noValidate
    >
      {formError.length > 0 && (
        <div className="form__error form__error--top form-error">
          {formError}
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

ResetPasswordForm.displayName = 'ResetPasswordForm'
ResetPasswordForm.propTypes = {
  token: propTypes.string,
}

export default ResetPasswordForm
