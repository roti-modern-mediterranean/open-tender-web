import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeCustomerCreditCard } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { CreditCards } from '../..'
import { openModal } from '../../../slices'
import { FormHeader } from '../../inputs'

const CheckoutCreditCardNew = styled('div')`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
`

const PaymentLinkedCards = ({ linkedCards = [] }) => {
  const dispatch = useDispatch()

  const remove = (evt, cardId) => {
    evt.preventDefault()
    dispatch(removeCustomerCreditCard(cardId))
    evt.target.blur()
  }

  return (
    <div>
      <FormHeader style={{ marginBottom: '2rem' }}>
        <h2>Linked Cards</h2>
        <p>
          These are cards you have saved in either Apple Pay or Google Pay that
          have been linked with your account for loyalty recognition at the
          point of sale in our restaurants.
        </p>
      </FormHeader>
      {linkedCards.length > 0 && (
        <CreditCards creditCards={linkedCards} remove={remove} />
      )}
      <CheckoutCreditCardNew>
        <ButtonStyled
          size="big"
          color="secondary"
          onClick={() => dispatch(openModal({ type: 'creditCardLinked' }))}
        >
          Add New Linked Card
        </ButtonStyled>
      </CheckoutCreditCardNew>
    </div>
  )
}

PaymentLinkedCards.displayName = 'PaymentLinkedCards'
PaymentLinkedCards.prototypes = {
  savedCards: propTypes.array,
}

export default PaymentLinkedCards
