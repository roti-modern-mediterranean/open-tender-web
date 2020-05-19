import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { FormContext } from './CheckoutForm'
import { amex, discover, mastercard, visa, creditcard } from './assets'
import { iconMap } from './icons'
import CircleLoader from './CircleLoader'

const cardIcons = {
  VISA: visa,
  MC: mastercard,
  DISC: discover,
  AMEX: amex,
  OTHER: creditcard,
}

const CheckoutCreditCards = ({ addTender, removeTender }) => {
  const formContext = useContext(FormContext)
  const { check, form } = formContext
  const cards = check.customer ? check.customer.credit_cards : []

  const appliedCards = form.tenders
    .filter((i) => i.tender_type === 'CREDIT')
    .map((i) => i.customer_card_id)

  return (
    <div className="cards bg-secondary-color">
      <ul className="cards__list">
        {cards.map((card) => {
          const tender = { ...card, tender_type: 'CREDIT' }
          const isApplied = appliedCards.includes(card.customer_card_id)
          const isDisabled = appliedCards.length && !isApplied
          const classes = `cards__card bg-color border-radius ${
            isDisabled ? '-disabled' : ''
          }`
          return (
            <li key={card.customer_card_id} className={classes}>
              <div className="cards__card__image">
                <img
                  src={cardIcons[card.card_type]}
                  alt={card.card_type_name}
                />
              </div>
              <div className="cards__card__name">
                {card.card_type_name} ending in {card.last4}
                {card.is_default ? ' (default)' : ''}
              </div>
              <div className="cards__card__add">
                {isApplied ? (
                  <CircleLoader complete={true} />
                ) : (
                  <button
                    type="button"
                    onClick={(evt) => addTender(evt, tender)}
                    className="btn-link"
                    disabled={isApplied || isDisabled}
                  >
                    {iconMap['PlusCircle']}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

CheckoutCreditCards.displayName = 'CheckoutCreditCards'
CheckoutCreditCards.prototypes = {
  addTender: propTypes.func,
  removeTender: propTypes.func,
}

export default CheckoutCreditCards
