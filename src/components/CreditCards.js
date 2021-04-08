import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { CreditCard } from '.'

const CreditCardsView = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const CreditCardView = styled('button')`
  flex: 1 1 20rem;
  max-width: 50%;
  padding: 0 1rem 2rem;
  text-align: left;

  &:hover {
    & > div {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.1) 0.5%,
          rgba(0, 0, 0, 0.042) 49.48%,
          rgba(0, 0, 0, 0) 99.5%
        ),
        ${(props) => props.theme.colors.blue};
    }
  }
`

const CreditCards = ({ creditCards, selectedId, apply, remove }) => {
  return (
    <CreditCardsView>
      {creditCards.map((card) => {
        const data = { acct: `xxxx xxxx xxxx ${card.last4}` }
        const applied = card.customer_card_id === selectedId
        return (
          <CreditCardView
            key={card.customer_card_id}
            onClick={(evt) => apply(evt, card.customer_card_id)}
          >
            <CreditCard
              card={data}
              cardType={card.card_type}
              applied={applied}
              style={{ boxShadow: 'none' }}
            />
          </CreditCardView>
        )
      })}
    </CreditCardsView>
  )
}

CreditCards.displayName = 'CreditCards'
CreditCards.prototypes = {
  creditCards: propTypes.array,
  selectedId: propTypes.number,
  apply: propTypes.func,
  remove: propTypes.func,
}

export default CreditCards
