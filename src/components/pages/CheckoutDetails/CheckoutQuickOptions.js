import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { FormHeader } from '../../inputs'

const CheckoutQuickOptionsView = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem 2rem;
`

const CheckoutQuickOption = styled('div')`
  width: 11.5rem;
  padding: 0 0.5rem 1rem;
`

const CheckoutQuickOptionButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10.5rem;
  height: 10.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 1.4rem;
  background-color: ${(props) =>
    props.theme.bgColors[props.checked ? 'dark' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.checked ? 'primary' : 'cardHover']};
  }

  &:focus {
    outline: none;
  }

  & > span:first-of-type {
    flex-shrink: 0;
    margin: 0 0 0.6rem;
  }
`

const CheckoutQuickOptionText = styled(Heading)`
  display: block;
  // padding: 0 1rem;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.05;
`

const CheckoutQuickOptions = ({ buttons, options, handleOption }) => {
  return (
    <>
      <FormHeader style={{ margin: '3rem 0 1rem' }}>
        <h2>Quick Options</h2>
      </FormHeader>
      <CheckoutQuickOptionsView>
        {buttons.map((button) => (
          <CheckoutQuickOption key={button.text}>
            <CheckoutQuickOptionButton
              onClick={(evt) => handleOption(evt, button.text)}
              checked={options.includes(button.text)}
            >
              {button.icon}
              <CheckoutQuickOptionText>{button.text}</CheckoutQuickOptionText>
            </CheckoutQuickOptionButton>
          </CheckoutQuickOption>
        ))}
      </CheckoutQuickOptionsView>
    </>
  )
}

CheckoutQuickOptions.displayName = 'CheckoutQuickOptions'
CheckoutQuickOptions.propTypes = {
  buttons: propTypes.array,
  options: propTypes.array,
  handleOption: propTypes.func,
}

export default CheckoutQuickOptions
