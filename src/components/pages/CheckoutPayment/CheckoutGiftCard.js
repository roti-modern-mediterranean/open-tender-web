import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { ButtonStyled, Preface } from '@open-tender/components'
import { Checkmark } from '../../icons'
// import { Checkmark } from '../../icons'

const CheckoutGiftCardView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2rem 1.6rem;
  margin: 0 0 1rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem 1.4rem 1rem;
  }

  p {
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.7rem;
    line-height: 1.35;
  }

  button {
    width: 10rem;
    padding-left: 0;
    padding-right: 0;
    color: ${(props) => props.theme.colors.paprika};
    border-color: ${(props) => props.theme.colors.paprika};
    background-color: transparent;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 8rem;
      font-size: 1.8rem;
    }

    &:enabled:hover,
    &:enabled:active {
      color: ${(props) => props.theme.colors.light};
      border-color: ${(props) => props.theme.colors.paprika};
      background-color: ${(props) => props.theme.colors.paprika};
    }

    &:enabled:focus,
    &:disabled {
      color: ${(props) => props.theme.colors.paprika};
      border-color: ${(props) => props.theme.colors.paprika};
      background-color: transparent;
    }
  }
`

const CreditCardCheckmarkView = styled('span')`
  width: 2.2rem;
  height: 2.2rem;
  margin: 0 0 0 1rem;
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

const CheckoutGiftCarCheckmark = ({ show }) => {
  return (
    <span>
      <CreditCardCheckmarkView show={show}>
        <span>
          <Checkmark />
        </span>
      </CreditCardCheckmarkView>
    </span>
  )
}

const CheckoutGiftCardTitleView = styled('div')`
  & > span {
    display: inline-block;
  }
`

const CheckoutGiftCardTitle = styled(Preface)`
  font-weight: 500;
`

export const CheckoutGiftCardNew = ({ disabled, onClick }) => (
  <CheckoutGiftCardView>
    <div>
      <CheckoutGiftCardTitle>Add a new gift card</CheckoutGiftCardTitle>
      {disabled ? (
        <p>You must create an account or login to add a new gift card</p>
      ) : (
        <p>Enter a gift card number directly</p>
      )}
    </div>
    {!disabled && (
      <div>
        <ButtonStyled onClick={onClick} disabled={disabled}>
          Add New
        </ButtonStyled>
      </div>
    )}
  </CheckoutGiftCardView>
)

CheckoutGiftCardNew.displayName = 'CheckoutGiftCardNew'
CheckoutGiftCardNew.propTypes = {
  disabled: propTypes.bool,
  onClick: propTypes.func,
}

const CheckoutGiftCard = ({
  giftCard,
  label,
  isApplied,
  disabled,
  onClick,
  amount,
}) => {
  const expired = dateStrToDate(giftCard.expiration) < new Date()
  if (expired) return null
  const expiration = giftCard.expiration
    ? `expires ${formatDateStr(giftCard.expiration, 'MMM d, yyyy')}`
    : 'expires never'
  return (
    <CheckoutGiftCardView>
      <div>
        <CheckoutGiftCardTitleView>
          <CheckoutGiftCardTitle>
            Gift Card {giftCard.card_number}
          </CheckoutGiftCardTitle>
          <CheckoutGiftCarCheckmark show={isApplied} />
        </CheckoutGiftCardTitleView>
        {isApplied ? (
          <p>${amount} applied to check</p>
        ) : (
          <p>
            ${giftCard.balance} balance, {expiration}
          </p>
        )}
      </div>
      <div>
        <ButtonStyled onClick={onClick} label={label} disabled={disabled}>
          {isApplied ? 'Remove' : 'Apply'}
        </ButtonStyled>
      </div>
    </CheckoutGiftCardView>
  )
}

CheckoutGiftCard.displayName = 'CheckoutGiftCard'
CheckoutGiftCard.propTypes = {
  giftCard: propTypes.object,
  label: propTypes.string,
  isApplied: propTypes.bool,
  disabled: propTypes.bool,
  onClick: propTypes.func,
  amount: propTypes.string,
}

export default CheckoutGiftCard
