import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { creditCardTypeMap } from './icons/creditCardTypes'

const CreditCardView = styled('div')`
  position: relative;
  width: 100%;
  padding: 31.81818% 0;
  border-radius: 1rem;
  transition: all 0.15s ease;
  box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.13);
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0.5%,
      rgba(0, 0, 0, 0.042) 49.48%,
      rgba(0, 0, 0, 0) 99.5%
    ),
    ${(props) =>
      props.isApplied
        ? props.theme.colors.blue
        : props.theme.bgColors.secondary};

  & > div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10% 7% 7% 9%;
  }
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

const CreditCard = ({ card, cardType, isApplied }) => {
  const { acct, exp } = card
  // const cardType = acct ? getCardType(acct.replace(/\s/g, '')) : null
  // const expiration = exp ? formatCardField('exp', exp) : '00 / 00'
  const expiration = exp || '00 / 00'
  return (
    <CreditCardView isApplied={isApplied}>
      <div>
        <div>
          {cardType ? creditCardTypeMap[cardType]() : <span>&nbsp;</span>}
        </div>
        <div>
          <MaskedCardNumber acct={acct} />
          <CreditCardText>{expiration}</CreditCardText>
        </div>
      </div>
    </CreditCardView>
  )
}

CreditCard.displayName = 'CreditCard'
CreditCard.propTypes = {
  card: propTypes.object,
  cardType: propTypes.string,
  isApplied: propTypes.bool,
}

export default CreditCard
