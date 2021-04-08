import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { CreditCard } from '.'
import { X } from 'react-feather'
import { useTheme } from '@emotion/react'

const CreditCardsView = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const CreditCardView = styled('div')`
  position: relative;
  flex: 0 0 20rem;
  padding: 0 1rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 1 1 20rem;
    max-width: 50%;
  }
`

const CreditCardButton = styled('button')`
  width: 100%;
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

const CreditCardRemove = styled('button')`
  display: block;
  position: absolute;
  z-index: 3;
  bottom: 3.2rem;
  right: 2rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.1rem 0 0;
  border-radius: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.paprika};
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
  transition: all 250ms ease;
  opacity: 0;
  visiblity: hidden;
  transform: scale(0);

  &:hover,
  &:active,
  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.primary};
  }

  .btn-parent:hover > & {
    opacity: 1;
    visiblity: visible;
    transform: scale(1);
  }
`

const CreditCards = ({ creditCards, selectedId, apply, remove }) => {
  const theme = useTheme()
  return (
    <CreditCardsView>
      {creditCards.map((card) => {
        const data = { acct: `xxxx xxxx xxxx ${card.last4}` }
        const applied = card.customer_card_id === selectedId
        return (
          <CreditCardView key={card.customer_card_id} className="btn-parent">
            <CreditCardButton
              onClick={
                apply ? (evt) => apply(evt, card.customer_card_id) : null
              }
            >
              <CreditCard
                card={data}
                cardType={card.card_type}
                applied={applied}
                style={{ boxShadow: 'none' }}
              />
            </CreditCardButton>
            {remove && (
              <CreditCardRemove
                onClick={(evt) => remove(evt, card.customer_card_id)}
              >
                <X size={16} color={theme.colors.light} />
              </CreditCardRemove>
            )}
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
