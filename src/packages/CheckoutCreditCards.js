import React, { useContext, useState } from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FormContext } from './CheckoutForm'
import { iconMap } from './icons'
import { cardIcons } from './utils/cards'
import CircleLoader from './CircleLoader'
import CheckoutNewCardForm from './CheckoutNewCardForm'

const NewCard = ({ appliedCards, addTender, showNewCard, setShowNewCard }) => {
  const newCard = appliedCards.find((i) => i.acct)
  const newCardType = newCard ? newCard.card_type : 'OTHER'
  const isApplied = !!newCard
  const isDisabled = appliedCards.length && !isApplied
  const disabled = isDisabled ? '-disabled' : ''
  const classes = `cards__card bg-color border-radius ${disabled}`

  const handleToggle = (evt) => {
    evt.preventDefault()
    setShowNewCard(true)
    evt.target.blur()
  }

  return !isDisabled ? (
    <li>
      <div className={classes}>
        <div className="cards__card__image">
          <img src={cardIcons[newCardType]} alt="New Credit Card" />
        </div>
        <div className="cards__card__name">
          {isApplied
            ? `New ${newCard.card_type} ending in ${newCard.last4}`
            : 'Add a new credit card'}
        </div>
        <div className="cards__card__add">
          {isApplied ? (
            <CircleLoader complete={true} />
          ) : (
            <button
              type="button"
              onClick={handleToggle}
              className="btn-link"
              disabled={isApplied || isDisabled}
            >
              {iconMap['PlusCircle']}
            </button>
          )}
        </div>
      </div>
      <TransitionGroup component={null}>
        {showNewCard ? (
          <CSSTransition
            key="modal"
            classNames="slide-toggle-down"
            timeout={250}
          >
            <CheckoutNewCardForm
              addTender={addTender}
              setShowNewCard={setShowNewCard}
            />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </li>
  ) : null
}

NewCard.displayName = 'NewCard'
NewCard.propTypes = {
  appliedCards: propTypes.array,
  addTender: propTypes.func,
}

const ExistingCard = ({ card, appliedCards, existingCards, addTender }) => {
  const tender = { ...card, tender_type: 'CREDIT' }
  const isApplied = existingCards.includes(card.customer_card_id)
  const isDisabled = appliedCards.length && !isApplied
  const disabled = isDisabled ? '-disabled' : ''
  const classes = `cards__card bg-color border-radius ${disabled}`
  return !isDisabled ? (
    <li>
      <div className={classes}>
        <div className="cards__card__image">
          <img src={cardIcons[card.card_type]} alt={card.card_type_name} />
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
      </div>
    </li>
  ) : null
}

ExistingCard.displayName = 'ExistingCard'
ExistingCard.propTypes = {
  card: propTypes.object,
  appliedCards: propTypes.array,
  existingCards: propTypes.array,
  addTender: propTypes.func,
}

const CheckoutCreditCards = ({ addTender }) => {
  const [showNewCard, setShowNewCard] = useState(false)
  const formContext = useContext(FormContext)
  const { check, form } = formContext

  const cards = check.customer ? check.customer.credit_cards : []
  const appliedCards = form.tenders.filter((i) => i.tender_type === 'CREDIT')
  const existingCards = appliedCards.map((i) => i.customer_card_id)

  return (
    <div className="cards bg-secondary-color">
      <ul className={`cards__list ${showNewCard ? '-disabled' : ''}`}>
        {cards.map((card) => (
          <ExistingCard
            key={card.customer_card_id}
            card={card}
            appliedCards={appliedCards}
            existingCards={existingCards}
            addTender={addTender}
          />
        ))}
        <NewCard
          appliedCards={appliedCards}
          addTender={addTender}
          showNewCard={showNewCard}
          setShowNewCard={setShowNewCard}
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
