import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAmountRemaining } from '@open-tender/js'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { openModal } from '../../../slices'
import CheckoutGiftCard, { CheckoutGiftCardNew } from './CheckoutGiftCard'
import styled from '@emotion/styled'
// import { FormHeader } from '../../inputs'

const CheckoutGiftCardsView = styled('div')`
  margin: 6rem 0 5rem;
`

const CheckoutGiftCards = () => {
  const dispatch = useDispatch()
  const { check, form } = useSelector(selectCheckout)
  // const { checkout: config } = useSelector(selectConfig)
  const hasCustomer = check.customer && check.customer.customer_id
  const giftCards =
    check.customer && check.customer.gift_cards
      ? check.customer.gift_cards
      : null
  // if (!giftCards) return null
  const giftCardsApplied = form.tenders
    .filter((i) => i.tender_type === 'GIFT_CARD')
    .reduce((obj, i) => ({ ...obj, [i.card_number]: i.amount }), {})
  const isZero = check ? check.totals.total === '0.00' : false

  const addGiftCard = () => {
    const validate = () => dispatch(validateOrder())
    const args = { validate, submitText: 'Add Gift Card' }
    dispatch(openModal({ type: 'giftCardAssign', args }))
  }

  const applyGiftCard = (cardNumber, balance) => {
    const giftCards = form.tenders.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = giftCards.length
      ? checkAmountRemaining(check.totals.total, giftCards)
      : parseFloat(check.totals.total)
    const amount = Math.min(remaining, parseFloat(balance)).toFixed(2)
    if (parseFloat(amount) <= 0.0) return
    const newGiftCard = {
      tender_type: 'GIFT_CARD',
      card_number: cardNumber,
      balance: balance,
      amount: amount,
    }
    dispatch(updateForm({ tenders: [...form.tenders, newGiftCard] }))
  }

  const removeGiftCard = (cardNumber) => {
    const filtered = form.tenders.filter((i) => i.card_number !== cardNumber)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    const giftCard = filtered.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = giftCard.map((i) => {
      const newAmount = Math.min(remaining, parseFloat(i.balance))
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    const adjustedOther = nonGiftCard.map((i) => {
      const newAmount = parseFloat(i.amount) + remaining
      remaining = 0.0
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZeroOther = adjustedOther.filter((i) => i.amount !== '0.00')
    dispatch(updateForm({ tenders: [...nonZeroOther, ...nonZero] }))
  }

  return (
    <CheckoutGiftCardsView>
      {/* <FormHeader>
        <h2>{config.giftCards.title}</h2>
        <p>
          {hasCustomer
            ? config.giftCards.subtitle
            : 'Have a gift card number? Please log into your account or create one via the button above in order to use the gift card here.'}
        </p>
      </FormHeader> */}
      {giftCards &&
        giftCards.map((i) => {
          const amount = giftCardsApplied[i.card_number]
          const isApplied = !!amount
          const onClick = isApplied
            ? () => removeGiftCard(i.card_number)
            : () => applyGiftCard(i.card_number, i.balance)
          const disabled = !isApplied && isZero
          const label = isApplied
            ? `Remove gift card ${i.card_number} with amount of ${amount}`
            : `Apply gift card ${i.card_number} with balance of ${i.balance}`
          return (
            <CheckoutGiftCard
              key={i.card_number}
              giftCard={i}
              label={label}
              isApplied={isApplied}
              disabled={disabled}
              onClick={onClick}
              amount={amount}
            />
          )
        })}
      <CheckoutGiftCardNew disabled={!hasCustomer} onClick={addGiftCard} />
    </CheckoutGiftCardsView>
  )
}

CheckoutGiftCards.displayName = 'CheckoutGiftCards'

export default CheckoutGiftCards
