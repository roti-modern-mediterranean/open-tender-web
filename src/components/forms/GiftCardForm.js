import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useGiftCardForm } from '@open-tender/components'
import { ErrMsg, FormSubmit, Input } from '../inputs'
import { CreditCards } from '..'
import { Cash } from '../icons'

const GiftCardForm = ({
  giftCard,
  creditCards,
  loading,
  error,
  update,
  add,
  callback,
}) => {
  const {
    submitRef,
    inputRef,
    errors,
    data,
    submitting,
    handleChange,
    handleSubmit,
  } = useGiftCardForm(
    giftCard,
    creditCards,
    loading,
    error,
    update,
    add,
    callback
  )

  const apply = (evt, cardId) => {
    evt.preventDefault()
    const target = {
      id: 'customer_card_id',
      type: 'text',
      value: cardId,
    }
    handleChange({ target })
    evt.target.blur()
  }

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg
        errMsg={errors.customer_card_id || errors.form}
        style={{ margin: '0 0 2rem' }}
      />
      <div>
        <Input
          ref={inputRef}
          icon={<Cash />}
          label="Amount"
          name="amount"
          type="number"
          value={data.amount}
          onChange={handleChange}
          error={errors.amount}
          required={true}
        />
        <CreditCards
          creditCards={creditCards}
          selectedId={data.customer_card_id}
          apply={apply}
        />
      </div>
      <FormSubmit style={{ margin: '0' }}>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : giftCard ? 'Add Value' : 'Purchase'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GiftCardForm.displayName = 'GiftCardForm'
GiftCardForm.propTypes = {
  giftCard: propTypes.object,
  creditCards: propTypes.array,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  add: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardForm
