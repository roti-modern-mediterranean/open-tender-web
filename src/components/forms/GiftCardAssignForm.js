import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useGiftCardAssignForm } from '@open-tender/components'
import { ErrMsg, FormSubmit, Input } from '../inputs'
import { CreditCard } from '../icons'

const GiftCardAssignOtherForm = ({ loading, error, assign, callback }) => {
  const {
    submitRef,
    inputRef,
    cardNumber,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useGiftCardAssignForm(loading, error, assign, callback)
  const errMsg = errors.form && !errors.email ? errors.form : null

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <div>
        <Input
          ref={inputRef}
          icon={<CreditCard />}
          label="Card Number"
          name="card_number"
          type="number"
          value={cardNumber}
          onChange={handleChange}
          error={errors.card_number}
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
