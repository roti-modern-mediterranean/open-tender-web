import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { creditCardTypeMap } from './icons/creditCardTypes'
import { Checkmark } from './icons'

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
        <MaskedCardNumberGroup key={`${group}-${index}`}>
          {group.split('').map((digit, digitIndex) =>
            !acct || index < 3 ? (
              <span key={`${index}-${digitIndex}`}>
                <Ellipsis />
              </span>
            ) : (
              <CreditCardText key={`${index}-${digitIndex}`}>
                {digit}
              </CreditCardText>
            )
          )}
        </MaskedCardNumberGroup>
      ))}
    </MaskedCardNumberView>
  )
}

const CreditCardCheckmarkView = styled('span')`
  display: block;
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.1rem 0 0;
  border-radius: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.beet};
  transition: all 250ms ease;
  opacity: ${(props) => (props.show ? '1' : '0')};
  visiblity: ${(props) => (props.show ? 'visible' : 'hidden')};
  transform: ${(props) => (props.show ? 'scale(1)' : 'scale(0)')};
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
`

const CreditCardCheckmark = ({ show }) => {
  return (
    <CreditCardCheckmarkView show={show}>
      <span>
        <Checkmark />
      </span>
    </CreditCardCheckmarkView>
  )
}

const CreditCardView = styled('div')`
  position: relative;
  width: 100%;
  padding: 31.81818% 0;
  border-radius: 1rem;
  transition: all 250ms ease;
  box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.13);
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0.5%,
      rgba(0, 0, 0, 0.042) 49.48%,
      rgba(0, 0, 0, 0) 99.5%
    ),
    ${(props) =>
      props.applied ? props.theme.colors.blue : props.theme.bgColors.secondary};
`

const CreditCardContent = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10% 7% 7% 9%;
`

const CreditCard = ({ card, cardType, applied, style = null }) => {
  const { acct, exp } = card
  // const cardType = acct ? getCardType(acct.replace(/\s/g, '')) : null
  // const expiration = exp ? formatCardField('exp', exp) : '00 / 00'
  const expiration = exp || '00 / 00'
  return (
    <CreditCardView applied={applied} style={style}>
      <CreditCardContent>
        <div>
          {cardType ? creditCardTypeMap[cardType]() : <span>&nbsp;</span>}
        </div>
        <div>
          <MaskedCardNumber acct={acct} />
          <CreditCardText>{expiration}</CreditCardText>
        </div>
      </CreditCardContent>
      <CreditCardCheckmark show={applied} />
    </CreditCardView>
  )
}

CreditCard.displayName = 'CreditCard'
CreditCard.propTypes = {
  card: propTypes.object,
  cardType: propTypes.string,
  applied: propTypes.bool,
  style: propTypes.object,
}

export default CreditCard
