import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  updateCustomerCreditCard,
  removeCustomerCreditCard,
} from '@open-tender/redux'
import { Button, CircleLoader } from '@open-tender/components'

import SectionRow from './SectionRow'
import { cardIconMap } from '../assets/cardIcons'

const CreditCards = ({ creditCards, isLoading }) => {
  const dispatch = useDispatch()

  const handleDefault = (evt, creditCard) => {
    evt.preventDefault()
    const cardId = creditCard.customer_card_id
    const data = { is_default: true }
    dispatch(updateCustomerCreditCard(cardId, data))
    evt.target.blur()
  }

  const handleDelete = (evt, creditCard) => {
    evt.preventDefault()
    const cardId = creditCard.customer_card_id
    dispatch(removeCustomerCreditCard(cardId))
    evt.target.blur()
  }

  return (
    <div className="section__content ot-bg-color-primary ot-border-radius">
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
                  <p className="ot-preface ot-font-size-x-small ot-color-secondary">
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
                <p className="ot-font-size-small ot-color-secondary">
                  {creditCard.masked}
                </p>
                <p className="ot-font-size-small ot-color-secondary">
                  <Button
                    text="make default"
                    classes="ot-btn-link"
                    onClick={(evt) => handleDefault(evt, creditCard)}
                    disabled={creditCard.is_default || isLoading}
                  />
                  <span className="link-separator">|</span>
                  <Button
                    text="remove"
                    classes="ot-btn-link"
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
  isLoading: propTypes.boolean,
}
export default CreditCards
