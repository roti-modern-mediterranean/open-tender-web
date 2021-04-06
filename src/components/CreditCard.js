import styled from '@emotion/styled'
import { creditCardTypeMap } from './icons/creditCardTypes'

const CreditCardView = styled('div')`
  width: 22rem;
  height: 14rem;
  padding: 2.4rem 1.6rem 1.9rem 1.9rem;
  border-radius: 1rem;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0.5%,
      rgba(0, 0, 0, 0.042) 49.48%,
      rgba(0, 0, 0, 0) 99.5%
    ),
    ${(props) => props.theme.bgColors.secondary};
  // background-color: ${(props) => props.theme.bgColors.secondary};
  box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Ellipsis = styled('span')`
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.5);
`

const MaskedCardNumberView = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const MaskedCardNumberGroup = styled('div')`
  flex: 0 0 19%;
  height: 2rem;
  margin: 0 8% 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:last-of-type {
    margin: 0;
  }

  & > span {
    flex: 0 0 25%;
    display: inline-block;
    text-align: center;
  }
`

const CreditCardText = styled('span')`
  color: #ffffff;
  font-size: 1.2rem;
  letter-spacing: 0.06em;
`

const MaskedCardNumber = ({ acct }) => {
  const cardNumber = acct || 'xxxx xxxx xxxx xxxx'
  const groups = cardNumber.split(' ')
  return (
    <MaskedCardNumberView>
      {groups.map((group, index) => (
        <MaskedCardNumberGroup>
          {group.split('').map((digit) =>
            !acct || index < 3 ? (
              <span>
                <Ellipsis />
              </span>
            ) : (
              <CreditCardText>{digit}</CreditCardText>
            )
          )}
        </MaskedCardNumberGroup>
      ))}
    </MaskedCardNumberView>
  )
}

const CreditCard = ({ card, cardType }) => {
  const { acct, exp } = card
  // const cardType = acct ? getCardType(acct.replace(/\s/g, '')) : null
  // const expiration = exp ? formatCardField('exp', exp) : '00 / 00'
  const expiration = exp || '00 / 00'
  return (
    <CreditCardView>
      <div>
        {cardType ? creditCardTypeMap[cardType]() : <span>&nbsp;</span>}
      </div>
      <div>
        <MaskedCardNumber acct={acct} />
        <CreditCardText>{expiration}</CreditCardText>
      </div>
    </CreditCardView>
  )
}

export default CreditCard
