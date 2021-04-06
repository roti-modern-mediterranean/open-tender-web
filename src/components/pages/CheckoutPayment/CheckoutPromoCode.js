import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { Tag } from '../../icons'
import { Input } from '../../inputs'

const CheckoutPromoCodeView = styled('div')`
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
  const { check, errors, form, loading } = useSelector(selectCheckout)
  const [promoCode, setPromoCode] = useState(form.promoCodes[0] || '')
  const [applying, setApplying] = useState(false)
  const errMsg = errors.promo_codes ? errors.promo_codes['0'] : null
  const applied = check
    ? check.discounts.find(
        (i) => i.name.toLowerCase() === promoCode.toLowerCase()
      )
    : false

  useEffect(() => {
    if (loading === 'idle') setApplying(false)
  }, [loading])

  const apply = () => {
    setApplying(true)
    dispatch(updateForm({ promoCodes: [promoCode] }))
    dispatch(validateOrder())
  }

  const remove = () => {
    setPromoCode('')
    dispatch(updateForm({ promoCodes: [] }))
    dispatch(validateOrder())
  }

  return (
    <CheckoutPromoCodeView>
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
      {applied ? (
        <ButtonStyled
          onClick={remove}
          color="secondary"
          size="big"
          style={{ backgroundColor: 'transparent' }}
        >
          Remove
        </ButtonStyled>
      ) : (
        <ButtonStyled
          onClick={apply}
          color="secondary"
          size="big"
          disabled={applying || promoCode === ''}
          style={{ backgroundColor: 'transparent' }}
        >
          Apply
        </ButtonStyled>
      )}
    </CheckoutPromoCodeView>
  )
}

export default CheckoutPromoCode
