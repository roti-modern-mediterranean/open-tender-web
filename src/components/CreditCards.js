import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  updateCustomerCreditCard,
  removeCustomerCreditCard,
} from 'open-tender-redux'
import { Button, CircleLoader, cardIconMap } from 'open-tender'

import SectionRow from './SectionRow'

const CreditCards = ({ creditCards, token, isLoading }) => {
  const dispatch = useDispatch()

  const handleDefault = (evt, creditCard) => {
    evt.preventDefault()
    const cardId = creditCard.customer_card_id
    const data = { is_default: true }
    dispatch(updateCustomerCreditCard({ token, cardId, data }))
    evt.target.blur()
  }

  const handleDelete = (evt, creditCard) => {
    evt.preventDefault()
    const cardId = creditCard.customer_card_id
    dispatch(removeCustomerCreditCard({ token, cardId }))
    evt.target.blur()
  }

  return (
    <div className="section__content bg-color border-radius">
      <div className="section__rows">
        {creditCards.map((creditCard) => (
          <SectionRow
            key={creditCard.customer_card_id}
            title={
              <span className="cards__card__image">
                <img
                  src={cardIconMap[creditCard.card_type]}
                  alt={creditCard.card_type_name}
                />
              </span>
            }
          >
            <div className="section__row__container">
              <div className="section__row__container__content">
                {creditCard.is_default && (
                  <p className="preface font-size-x-small secondary-color">
                    Default
                  </p>
                )}
                <p className="section__row__relative">
                  {creditCard.card_type_name} ending in {creditCard.last4}
                  {creditCard.is_default && (
                    <span className="section__row__default">
                      <CircleLoader complete={true} />
                    </span>
                  )}
                </p>
                <p className="font-size-small secondary-color">
                  {creditCard.masked}
                </p>
                <p className="font-size-small secondary-color">
                  <Button
                    text="make default"
                    classes="btn-link"
                    onClick={(evt) => handleDefault(evt, creditCard)}
                    disabled={creditCard.is_default || isLoading}
                  />
                  <span className="btn-link-separator">|</span>
                  <Button
                    text="remove"
                    classes="btn-link"
                    onClick={(evt) => handleDelete(evt, creditCard)}
                    disabled={isLoading}
                  />
                </p>
              </div>
            </div>
          </SectionRow>
        ))}
      </div>
    </div>
  )
}

CreditCards.displayName = 'CreditCards'
CreditCards.prototypes = {
  creditCards: propTypes.array,
  token: propTypes.string,
  isLoading: propTypes.boolean,
}
export default CreditCards
