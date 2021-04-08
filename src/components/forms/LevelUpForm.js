import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useLevelUpForm } from '@open-tender/components'
import { ErrMsg, FormSubmit, Input } from '../inputs'
import { Lock, Mail } from '../icons'

const LevelUpForm = ({ email, loading, error, connect, callback }) => {
  const {
    submitRef,
    inputRef,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useLevelUpForm(email, loading, error, connect, callback)

  return (
    <form id="levelup-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={error} style={{ margin: '0 0 2rem' }} />
      <div>
        <Input
          ref={inputRef}
          icon={<Mail />}
          label="Email"
          name="email"
          type="email"
          value={data.email}
          error={errors.email}
          onChange={handleChange}
          required={true}
          autoComplete="email"
        />
        <Input
          label="Password"
          icon={<Lock />}
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          required={true}
          autoComplete="off"
        />
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Connecting LevelUp...' : 'Connect LevelUp'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

LevelUpForm.displayName = 'LevelUpForm'
LevelUpForm.propTypes = {
  email: propTypes.string,
  loading: propTypes.string,
  error: propTypes.object,
  connect: propTypes.func,
  callback: propTypes.func,
}

export default LevelUpForm
