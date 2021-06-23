import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonStyled, Preface } from '@open-tender/components'
import { Checkmark } from '../../icons'
import CheckoutCheckmark from './CheckoutCheckmark'
// import { Checkmark } from '../../icons'

const CheckoutHouseAccountView = styled('div')`
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

const CheckoutHouseAccountCheckmark = ({ show }) => {
  return (
    <span>
      <CheckoutCheckmark show={show}>
        <span>
          <Checkmark />
        </span>
      </CheckoutCheckmark>
    </span>
  )
}

const CheckoutHouseAccountTitleView = styled('div')`
  & > span {
    display: inline-block;
  }
`

const CheckoutHouseAccountTitle = styled(Preface)`
  font-weight: 500;
`

const CheckoutHouseAccount = ({
  label,
  msg,
  isApplied,
  disabled,
  onClick,
  amount,
}) => {
  return (
    <CheckoutHouseAccountView>
      <div>
        <CheckoutHouseAccountTitleView>
          <CheckoutHouseAccountTitle>{label}</CheckoutHouseAccountTitle>
          <CheckoutHouseAccountCheckmark show={isApplied} />
        </CheckoutHouseAccountTitleView>
        {isApplied ? (
          <p>Applied to check</p>
        ) : (
          <p>{disabled ? msg : 'Eligible for payment but not yet applied'}</p>
        )}
      </div>
      <div>
        <ButtonStyled onClick={onClick} label={label} disabled={disabled}>
          {isApplied ? 'Remove' : 'Apply'}
        </ButtonStyled>
      </div>
    </CheckoutHouseAccountView>
  )
}

CheckoutHouseAccount.displayName = 'CheckoutHouseAccount'
CheckoutHouseAccount.propTypes = {
  label: propTypes.string,
  msg: propTypes.string,
  isApplied: propTypes.bool,
  disabled: propTypes.bool,
  onClick: propTypes.func,
  amount: propTypes.string,
}

export default CheckoutHouseAccount
