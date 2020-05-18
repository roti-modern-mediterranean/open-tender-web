import React, { useContext } from 'react'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'
import { checkAmountRemaining } from './utils'

const CheckoutGiftCardLabel = ({ giftCard, amount }) => {
  return (
    <>
      <span className="font-size">Gift Card {giftCard.card_number}</span>
      <span className="font-size-small">
        Balance of ${giftCard.balance}
        {amount && <span> (${amount} applied to check)</span>}
      </span>
    </>
  )
}

const CheckoutGiftCards = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, updateForm } = formContext

  const giftCards =
    check.customer && check.customer.gift_cards
      ? check.customer.gift_cards
      : null
  if (!giftCards) return null

  const giftCardsApplied = form.tenders
    .filter((i) => i.tender_type === 'GIFT_CARD')
    .reduce((obj, i) => ({ ...obj, [i.card_number]: i.amount }), {})

  const applyGiftCard = (evt, cardNumber, balance) => {
    evt.preventDefault()
    const remaining = checkAmountRemaining(check.totals.total, form.tenders)
    const amount = Math.min(remaining, parseFloat(balance)).toFixed(2)
    const newGiftCard = {
      tender_type: 'GIFT_CARD',
      card_number: cardNumber,
      balance: balance,
      amount: amount,
    }
    updateForm({ tenders: [...form.tenders, newGiftCard] })
    evt.target.blur()
  }

  const removeGiftCard = (evt, cardNumber) => {
    evt.preventDefault()
    const filtered = form.tenders.filter((i) => i.card_number !== cardNumber)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = filtered.map((i) => {
      const newAmount = Math.min(remaining, parseFloat(i.balance))
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    updateForm({ tenders: [...nonGiftCard, ...nonZero] })
    evt.target.blur()
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">
          {config.giftCards.title}
        </p>
        <p className="form__legend__subtitle">{config.giftCards.subtitle}</p>
      </div>
      <div className="form__inputs">
        {giftCards.map((i) => {
          const amount = giftCardsApplied[i.card_number]
          return (
            <CheckoutLineItem
              key={i.card_number}
              label={<CheckoutGiftCardLabel giftCard={i} amount={amount} />}
            >
              <div className="form__line__wrapper">
                {amount ? (
                  <>
                    <span className="form__line__success">
                      <CircleLoader complete={true} />
                    </span>
                    <Button
                      text="Remove Gift Card"
                      ariaLabel={`Remove gift card ${i.card_number} with amount of ${amount}`}
                      icon="XCircle"
                      classes="btn--header"
                      onClick={(evt) => removeGiftCard(evt, i.card_number)}
                    />
                  </>
                ) : (
                  <Button
                    text="Apply Gift Card"
                    ariaLabel={`Apply gift card ${i.card_number} with balance of ${i.balance}`}
                    icon="PlusCircle"
                    classes="btn--header"
                    onClick={(evt) =>
                      applyGiftCard(evt, i.card_number, i.balance)
                    }
                  />
                )}
              </div>
            </CheckoutLineItem>
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutGiftCards.displayName = 'CheckoutGiftCards'

export default CheckoutGiftCards
