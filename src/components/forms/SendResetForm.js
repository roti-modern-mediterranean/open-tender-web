import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useSendResetForm } from '@open-tender/components'
import { ErrMsg, FormSubmit, Input } from '../inputs'
import { Mail } from '../icons'

const SendResetForm = ({ loading, error, sendReset, callback }) => {
  const {
    submitRef,
    inputRef,
    data,
    errMsg,
    handleChange,
    handleSubmit,
  } = useSendResetForm(loading, error, sendReset, callback)

  return (
    <form id="send-reset-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
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
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={loading === 'pending'}
        >
          {loading === 'pending' ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

SendResetForm.displayName = 'SendResetForm'
SendResetForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.string,
  sendReset: propTypes.func,
  callback: propTypes.func,
}

export default SendResetForm
