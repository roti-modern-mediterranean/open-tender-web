import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  updateCustomerCreditCard,
  removeCustomerCreditCard,
} from '@open-tender/redux'
import { ButtonLink, Preface } from '@open-tender/components'

import { cardIconMap } from '../../../assets/cardIcons'
import { LinkSeparator, Row } from '../..'
import styled from '@emotion/styled'

const CreditCardIcon = styled('span')`
  display: block;
  width: 6rem;
  min-width: 6rem;
  // height: auto;
`

const CreditCards = ({ creditCards, isLoading }) => {
  const dispatch = useDispatch()

  const handleDefault = (creditCard) => {
    const cardId = creditCard.customer_card_id
    const data = { is_default: true }
    dispatch(updateCustomerCreditCard(cardId, data))
  }

  const handleDelete = (creditCard) => {
    const cardId = creditCard.customer_card_id
    dispatch(removeCustomerCreditCard(cardId))
  }

  return (
    <div style={{ margin: '4rem 0 0' }}>
      {creditCards.map((creditCard) => (
        <Row
          key={creditCard.customer_card_id}
          icon={
            <CreditCardIcon>
              <img
                src={cardIconMap[creditCard.card_type]}
                alt={creditCard.card_type_name}
              />
            </CreditCardIcon>
          }
          content={
            <>
              {creditCard.is_default && (
                <Preface
                  size="xSmall"
                  style={{ display: 'inline-block', margin: '0 0 0.3rem' }}
                >
                  Default
                </Preface>
              )}
              <p>
                {creditCard.card_type_name} ending in {creditCard.last4}
              </p>
              <p>{creditCard.masked}</p>
              <p>
                <ButtonLink
                  onClick={() => handleDefault(creditCard)}
                  disabled={creditCard.is_default || isLoading}
                >
                  make default
                </ButtonLink>
                <LinkSeparator />
                <ButtonLink
                  onClick={() => handleDelete(creditCard)}
                  disabled={isLoading}
                >
                  remove
                </ButtonLink>
              </p>
            </>
          }
        />
      ))}
    </div>
  )
}

CreditCards.displayName = 'CreditCards'
CreditCards.prototypes = {
  creditCards: propTypes.array,
  isLoading: propTypes.bool,
}

export default CreditCards
