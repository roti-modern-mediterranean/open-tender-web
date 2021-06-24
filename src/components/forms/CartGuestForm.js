import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useCartGuestForm } from '@open-tender/components'

import { ErrMsg, Input, FormSubmit } from '../inputs'
import { User } from '../icons'

const iconMap = {
  first_name: <User />,
  last_name: <User />,
}

const CartGuestForm = ({ loading, errMsg, cartId, joinCart }) => {
  const {
    submitRef,
    inputRef,
    fields,
    data,
    submitting,
    handleChange,
    handleSubmit,
  } = useCartGuestForm(loading, errMsg, cartId, joinCart)

  return (
    <form id="cart-quest-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <div>
        {fields.map((field, index) => (
          <Input
            ref={index === 0 ? inputRef : null}
            key={field.name}
            icon={iconMap[field.name]}
            label={field.label}
            name={field.name}
            type={field.type}
            value={data[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        ))}
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : 'Join The Group!'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

CartGuestForm.displayName = 'CartGuestForm'
CartGuestForm.propTypes = {
  loading: propTypes.string,
  errMsg: propTypes.string,
  cartId: propTypes.number,
  joinCart: propTypes.func,
}

export default CartGuestForm
