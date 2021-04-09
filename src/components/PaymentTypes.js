import propTypes from 'prop-types'
import styled from '@emotion/styled'

const PaymentTypesView = styled('div')`
  margin: 2rem 0 0;
`

const PaymentButtons = styled('div')`
  display: flex;
  justify-content: center;
  margin: 0 -0.5rem 3rem;
`

const PaymentButtonView = styled('div')`
  flex: 0 0 25%;
  max-width: 8.8rem;
  padding: 0 0.5rem;
`

const PaymentButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 4.6rem;
  padding: 0;
  border-radius: 1.1rem;
  background-color: ${(props) =>
    props.theme.bgColors[props.checked ? 'dark' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.checked ? 'primary' : 'cardHover']};
  }

  &:focus {
    outline: none;
  }

  & > span {
    flex-shrink: 0;
  }
`

const CheckoutTenderTypes = ({ tenderTypes, tenderType, setTenderType }) => {
  const handleButton = (evt, tenderType) => {
    evt.preventDefault()
    evt.target.blur()
    setTenderType(tenderType)
  }

  return (
    <PaymentTypesView>
      <PaymentButtons>
        {tenderTypes.map((button) => (
          <PaymentButtonView key={button.text}>
            <PaymentButton
              aria-label={button.text}
              onClick={(evt) => handleButton(evt, button.tenderType)}
              checked={tenderType === button.tenderType}
            >
              {button.icon}
            </PaymentButton>
          </PaymentButtonView>
        ))}
      </PaymentButtons>
    </PaymentTypesView>
  )
}

CheckoutTenderTypes.displayName = 'CheckoutTenderTypes'
CheckoutTenderTypes.propTypes = {
  tenderTypes: propTypes.array,
  tenderType: propTypes.string,
  setTenderType: propTypes.func,
}

export default CheckoutTenderTypes
