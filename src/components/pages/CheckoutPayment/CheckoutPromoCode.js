import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { ButtonSubmit } from '@open-tender/components'

import { Tag } from '../../icons'
import { Input } from '../../inputs'

const CheckoutPromoCodeView = styled('form')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 4rem;

  label {
    flex-grow: 1;
    margin: 0;
  }

  button {
    display: block;
    flex: 0 0 10.4rem;
    padding-left: 0;
    padding-right: 0;
    margin: 0 0 0 2rem;
  }
`

const CheckoutPromoCode = () => {
  const dispatch = useDispatch()
  const submitRef = useRef(null)
  const { check, errors, form, loading } = useSelector(selectCheckout)
  const [promoCode, setPromoCode] = useState(form.promoCodes[0] || '')
  const [submitting, setSubmitting] = useState(false)
  const errMsg = errors.promo_codes ? errors.promo_codes['0'] : null
  const applied = check
    ? check.discounts.find(
        (i) => i.name.toLowerCase() === promoCode.toLowerCase()
      )
    : false

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (errMsg) {
        dispatch(updateForm({ promoCodes: [] }))
      }
    }
  }, [loading, errMsg, dispatch])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (applied) {
      setPromoCode('')
      dispatch(updateForm({ promoCodes: [] }))
      dispatch(validateOrder())
    } else {
      setSubmitting(true)
      dispatch(updateForm({ promoCodes: [promoCode] }))
      dispatch(validateOrder())
    }
    submitRef.current.blur()
  }

  return (
    <CheckoutPromoCodeView id="login-form" onSubmit={handleSubmit} noValidate>
      <Input
        icon={<Tag />}
        label="Add promo code"
        name="promo_code"
        type="text"
        value={promoCode}
        onChange={(evt) => setPromoCode(evt.target.value)}
        error={errMsg}
        disabled={applied}
      />
      <ButtonSubmit
        size="big"
        color="secondary"
        submitRef={submitRef}
        submitting={submitting}
        disabled={promoCode === ''}
      >
        {applied ? 'Rmove' : 'Apply'}
      </ButtonSubmit>
    </CheckoutPromoCodeView>
  )
}

export default CheckoutPromoCode
