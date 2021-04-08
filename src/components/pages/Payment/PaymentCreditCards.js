import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  updateCustomerCreditCard,
  removeCustomerCreditCard,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { CreditCards } from '../..'
import { openModal } from '../../../slices'

const CheckoutCreditCardNew = styled('div')`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
`

const PaymentCreditCards = ({ savedCards = [] }) => {
  const dispatch = useDispatch()
  const defaultCard = savedCards.find((i) => i.is_default)
  const selectedId = defaultCard && defaultCard.customer_card_id

  const makeDefault = (evt, cardId) => {
    evt.preventDefault()
    const data = { is_default: true }
    dispatch(updateCustomerCreditCard(cardId, data))
    evt.target.blur()
  }

  const remove = (evt, cardId) => {
    evt.preventDefault()
    dispatch(removeCustomerCreditCard(cardId))
    evt.target.blur()
  }

  return (
    <div>
      {savedCards.length > 0 && (
        <CreditCards
          creditCards={savedCards}
          selectedId={selectedId}
          apply={makeDefault}
          remove={remove}
        />
      )}
      <CheckoutCreditCardNew>
        <ButtonStyled
          size="big"
          color="secondary"
          onClick={() => dispatch(openModal({ type: 'creditCard' }))}
        >
          Add New Card
        </ButtonStyled>
      </CheckoutCreditCardNew>
    </div>
  )
}

PaymentCreditCards.displayName = 'PaymentCreditCards'
PaymentCreditCards.prototypes = {
  savedCards: propTypes.array,
}

export default PaymentCreditCards
