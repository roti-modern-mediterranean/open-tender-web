import styled from '@emotion/styled'

const CheckoutCheckmark = styled('span')`
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

export default CheckoutCheckmark
