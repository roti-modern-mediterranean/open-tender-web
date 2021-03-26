import styled from '@emotion/styled'

const CartItemQuantity = styled('div')`
  flex: 0 0 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    background-color: transparent;
    border-radius: 0;
    min-height: 0;

    button {
      width: 3rem;
      height: 3rem;
      padding: 0;
      border-radius: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.theme.colors.beet};

      &:hover,
      &:active,
      &:focus {
        background-color: ${(props) => props.theme.colors.primary};
      }
    }

    input {
      width: 3.6rem;
      height: auto;
      padding: 0;
      border: 0;
      line-height: 1;
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 600;
      font-size: ${(props) => props.theme.fonts.sizes.big};
      color: ${(props) => props.theme.colors.primary};
      background-color: transparent;
    }
  }
`

export default CartItemQuantity
