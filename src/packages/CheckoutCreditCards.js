import React, { useContext, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { FormContext } from './CheckoutForm'
import { isEmpty } from './utils/helpers'
import { ExistingCard, NewCard } from '.'

const CheckoutCreditCards = ({ addTender, removeTender, setShowCredit }) => {
  const [showNewCard, setShowNewCard] = useState(false)
  const formContext = useContext(FormContext)
  const { check, form, errors } = formContext
  const customerId =
    check.customer && !isEmpty(check.customer)
      ? check.customer.customer_id
      : null
  const cards = customerId ? check.customer.credit_cards || [] : []
  const appliedCards = form.tenders.filter((i) => i.tender_type === 'CREDIT')
  const existingCards = appliedCards.map((i) => i.customer_card_id)
  const tenderErrors = errors ? errors.tenders || null : null
  const index = form.tenders ? form.tenders.length - 1 : 0
  const tenderError = tenderErrors ? tenderErrors[index] : null

  useEffect(() => {
    if (!customerId) setShowNewCard(true)
  }, [customerId])

  return (
    <div className="cards bg-secondary-color">
      {/* <ul className={`cards__list ${showNewCard ? '-disabled' : ''}`}> */}
      <ul className="cards__list">
        {cards.map((card) => (
          <ExistingCard
            key={card.customer_card_id}
            card={card}
            appliedCards={appliedCards}
            existingCards={existingCards}
            addTender={addTender}
            error={tenderError}
          />
        ))}
        <NewCard
          appliedCards={appliedCards}
          addTender={addTender}
          removeTender={removeTender}
          showNewCard={showNewCard}
          setShowNewCard={setShowNewCard}
          setShowCredit={setShowCredit}
          customerId={customerId}
          error={tenderError}
        />
      </ul>
    </div>
  )
}

CheckoutCreditCards.displayName = 'CheckoutCreditCards'
CheckoutCreditCards.prototypes = {
  addTender: propTypes.func,
}

export default CheckoutCreditCards
