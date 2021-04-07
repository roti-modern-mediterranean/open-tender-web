import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { CreditCard } from '../..'
import { ErrMsg } from '../../inputs'

const CheckoutCreditCardsView = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const CheckoutCreditCard = styled('button')`
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

const CheckoutCreditCards = ({
  cards,
  apply,
  remove,
  existingCard,
  tenderErrors,
}) => {
  const errMsg = tenderErrors ? Object.values(tenderErrors).join(', ') : null

  const handleClick = (evt, customer_card_id) => {
    evt.preventDefault()
    const applied =
      existingCard && customer_card_id === existingCard.customer_card_id
    applied ? remove() : apply({ customer_card_id })
    evt.target.blur()
  }

  return (
    <>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <CheckoutCreditCardsView>
        {cards.map((card) => {
          const data = { acct: `xxxx xxxx xxxx ${card.last4}` }
          const applied =
            existingCard &&
            card.customer_card_id === existingCard.customer_card_id
          return (
            <CheckoutCreditCard
              key={card.customer_card_id}
              onClick={(evt) => handleClick(evt, card.customer_card_id)}
            >
              <CreditCard
                card={data}
                cardType={card.card_type}
                applied={applied}
                style={{ boxShadow: 'none' }}
              />
            </CheckoutCreditCard>
          )
        })}
      </CheckoutCreditCardsView>
    </>
  )
}

CheckoutCreditCards.displayName = 'CheckoutCreditCards'
CheckoutCreditCards.propTypes = {
  cards: propTypes.array,
  apply: propTypes.func,
  remove: propTypes.func,
  existingCard: propTypes.object,
  tenderErrors: propTypes.object,
}

export default CheckoutCreditCards
