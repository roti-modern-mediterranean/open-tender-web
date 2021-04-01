import React from 'react'
import propTypes from 'prop-types'
import { optionsOrderNotificationsTemp } from '@open-tender/js'
import {
  ButtonSubmit,
  Checkbox,
  FormError,
  FormInputs,
  FormSubmit,
  RadioButtonGroup,
  useSignUpForm,
} from '@open-tender/components'

import { Input } from '../inputs'
import { Lock, Mail, Phone, User } from '../icons'

const iconMap = {
  first_name: <User />,
  last_name: <User />,
  email: <Mail />,
  password: <Lock />,
  phone: <Phone />,
}

const SignUpForm = ({
  loading,
  error,
  signUp,
  callback,
  optIns = {},
  hasThanx = false,
}) => {
  const {
    submitRef,
    formRef,
    order_notifications,
    accepts_marketing,
    data,
    errors,
    submitting,
    formfields,
    errMsg,
    handleChange,
    handleRadio,
    handleSubmit,
  } = useSignUpForm(loading, error, signUp, callback, optIns, hasThanx)

  return (
    <form id="signup-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {formfields.map((field) => (
          <Input
            key={field.name}
            icon={iconMap[field.name]}
            label={field.label}
            name={field.name}
            type={field.type}
            value={data[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            error={errors ? errors[field.name] : ''}
            required={field.required}
            autoComplete={field.autoComplete}
          />
        ))}
        {order_notifications && (
          <RadioButtonGroup
            label={order_notifications.title}
            name="order_notifications"
            value={data.order_notifications}
            options={optionsOrderNotificationsTemp}
            onChange={handleRadio}
            showLabel={true}
            required={true}
            description={order_notifications.description}
          />
        )}
        {accepts_marketing && (
          <Checkbox
            showLabel={true}
            required={true}
            label={accepts_marketing.title}
            id="accepts_marketing"
            on={data.accepts_marketing}
            onChange={handleChange}
            description={accepts_marketing.description}
          />
        )}
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

SignUpForm.displayName = 'SignUpForm'
SignUpForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  signUp: propTypes.func,
  callback: propTypes.func,
  optIns: propTypes.object,
  hasThanx: propTypes.bool,
}

export default SignUpForm
