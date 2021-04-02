import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useLoginForm } from '@open-tender/components'
import { ErrMsg, FormSubmit, Input } from '../inputs'
import { Lock, Mail } from '../icons'

const LoginForm = ({ loading, error, login, callback }) => {
  const {
    submitRef,
    inputRef,
    data,
    submitting,
    handleChange,
    handleSubmit,
  } = useLoginForm(loading, error, login, callback)

  return (
    <form id="login-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={error} style={{ margin: '0 0 2rem' }} />
      <div>
        <Input
          ref={inputRef}
          icon={<Mail />}
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required={true}
        />
        <Input
          label="Password"
          icon={<Lock />}
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required={true}
        />
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : 'Login'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'
LoginForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.string,
  login: propTypes.func,
  callback: propTypes.func,
}

export default LoginForm
