import styled from '@emotion/styled'

const ButtonGroupBig = styled('div')`
  button {
    width: 100%;

    &:first-of-type {
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
    }
  }

  button + button {
    margin-top: 1.5rem;
    background: transparent;

    &:hover,
    &:active,
    &:focus {
      background: transparent;
    }
  }
`

export default ButtonGroupBig
