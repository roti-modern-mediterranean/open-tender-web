import React, { useState } from 'react'
import propTypes from 'prop-types'
import Button from './Button'
import { Input } from './Inputs'
import { cardIcons, cardNames } from './constants'
import { getCardType, makeAcctNumber } from './utils'

const initialState = {
  acct: '',
  exp: '',
  cvv: '',
  zip: '',
}

const fields = [
  {
    label: 'Card Number',
    placeholder: '#### #### #### ####',
    name: 'acct',
    type: 'text',
  },
  { label: 'Expiration', placeholder: 'MMYY', name: 'exp', type: 'number' },
  { label: 'CVV', placeholder: '###', name: 'cvv', type: 'number' },
  { label: 'Zip Code', placeholder: '#####', name: 'zip', type: 'number' },
]

const CheckoutNewCardForm = ({ addTender, setShowNewCard }) => {
  const [newCard, setNewCard] = useState(initialState)
  const [cardType, setCardType] = useState('OTHER')

  const handleChange = (evt) => {
    let { id, value } = evt.target
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
      value = makeAcctNumber(value, currentType)
    }
    setNewCard({ ...newCard, [id]: value })
  }

  const submitTender = (evt) => {
    const tender = {
      ...newCard,
      tender_type: 'CREDIT',
      card_type: cardType,
      card_type_name: cardNames[cardType],
      last4: newCard.acct.slice(-4),
    }
    addTender(evt, tender)
    setShowNewCard(false)
  }

  const emptyFields = Object.values(newCard).filter((i) => !i.length).length
  const errors = {}

  return (
    <div className="cards__new">
      <div className="cards__new__container bg-color border-radius">
        <div className="cards__new__header">
          <p className="cards__new__title font-size-big ot-bold">
            Add a new card
          </p>
          <div className="cards__new__image">
            <img src={cardIcons[cardType]} alt={cardNames[cardType]} />
          </div>
        </div>
        <div className="cards__new__content">
          {fields.map((field) => {
            return (
              <Input
                label={field.label}
                name={field.name}
                type={field.type}
                value={newCard[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
                error={errors[field.name]}
                required={true}
                classes={`cards__new__${field.name}`}
              />
            )
          })}
        </div>
        <div className="cards__new__footer">
          <Button
            text="Add New Card"
            // icon="PlusCirlce"
            classes="btn btn--cart"
            onClick={submitTender}
            disabled={emptyFields}
          />
          <Button
            text="Cancel"
            ariaLabel="Cancel Add New Card"
            // icon="XCircle"
            classes="btn"
            onClick={() => setShowNewCard(false)}
          />
        </div>
      </div>
    </div>
  )
}

CheckoutNewCardForm.displayName = 'CheckoutNewCardForm'
CheckoutNewCardForm.propTypes = {
  addTender: propTypes.func,
  setShowNewCard: propTypes.func,
}

export default CheckoutNewCardForm
