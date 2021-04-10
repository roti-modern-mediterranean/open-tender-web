import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useResetPasswordForm } from '@open-tender/components'

import { ErrMsg, Input, FormSubmit } from '../inputs'
import { Lock } from '../icons'

const iconMap = {
  new_password: <Lock />,
  confirm: <Lock />,
}

const ResetPasswordForm = ({
  loading,
  error,
  reset,
  resetForm,
  resetToken,
}) => {
  const {
    submitRef,
    inputRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useResetPasswordForm(loading, error, reset, resetForm, resetToken)
  const errMsg = error ? errors.token || errors.form || null : null
  const emptyRequired =
    fields.filter((i) => i.required && !data[i.name]).length > 0

  return (
    <form id="reset-password-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <div>
        {fields.map((field, index) => (
          <Input
            key={field.name}
            icon={iconMap[field.name]}
            ref={index === 0 ? inputRef : null}
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
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          disabled={emptyRequired}
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

ResetPasswordForm.displayName = 'ResetPasswordForm'
ResetPasswordForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  reset: propTypes.func,
  resetForm: propTypes.func,
  resetToken: propTypes.string,
}

export default ResetPasswordForm
