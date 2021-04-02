import React, { useState } from 'react'
import propTypes from 'prop-types'
import { optionsOrderNotificationsTemp } from '@open-tender/js'
import { ButtonSubmit, useSignUpForm } from '@open-tender/components'

import { Checkbox, ErrMsg, Input, FormSubmit, RadioGroup } from '../inputs'
import { Lock, Mail, Phone, User } from '../icons'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const iconMap = {
  first_name: <User />,
  last_name: <User />,
  email: <Mail />,
  password: <Lock />,
  phone: <Phone />,
  company: <User />,
}

const TermsLabelView = styled('span')`
  a {
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
  }
`

const TermsLabel = () => (
  <TermsLabelView>
    By creating an account, you agree to the{' '}
    <Link to="/terms">Terms & Conditions</Link> and{' '}
    <Link to="/privacy">Privacy Policy</Link>
  </TermsLabelView>
)

const SignUpForm = ({
  loading,
  error,
  signUp,
  callback,
  optIns = {},
  checkConfig = {},
}) => {
  const [disabled, setDisabled] = useState(false)
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
  } = useSignUpForm(loading, error, signUp, callback, optIns, checkConfig)

  return (
    <form id="signup-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <div>
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
          <RadioGroup
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
            label={accepts_marketing.description}
            id="accepts_marketing"
            on={data.accepts_marketing}
            onChange={handleChange}
          />
        )}
        <Checkbox
          label={<TermsLabel />}
          id="terms"
          on={!disabled}
          onChange={() => setDisabled(!disabled)}
        />
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          disabled={disabled}
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : 'Register'}
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
  checkConfig: propTypes.object,
}

export default SignUpForm
