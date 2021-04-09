import React from 'react'
import propTypes from 'prop-types'
import {
  ButtonSubmit,
  useGiftCardAssignOtherForm,
} from '@open-tender/components'
import { ErrMsg, FormSubmit, Input } from '../inputs'
import { Mail } from '../icons'

const GiftCardAssignOtherForm = ({
  loading,
  error,
  giftCardId,
  assign,
  callback,
}) => {
  const {
    submitRef,
    inputRef,
    email,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useGiftCardAssignOtherForm(loading, error, giftCardId, assign, callback)
  const errMsg = errors.form && !errors.email ? errors.form : null

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <div>
        <Input
          ref={inputRef}
          icon={<Mail />}
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
          required={true}
        />
      </div>
      <FormSubmit style={{ margin: '0' }}>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : 'Assign Gift Card'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GiftCardAssignOtherForm.displayName = 'GiftCardAssignOtherForm'
GiftCardAssignOtherForm.propTypes = {
  giftCard: propTypes.object,
  creditCards: propTypes.array,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  add: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardAssignOtherForm
