import styled from '@emotion/styled'

export const FormWrapper = styled('div')`
  // max-width: ${(props) => props.theme.layout.maxWidth};
  max-width: 64rem;
  margin: 0 auto;
`

export const FormHeader = styled('div')`
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 0 4rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${(props) => props.theme.inputs.family};
    font-weight: 500;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-size: 2.2rem;
    line-height: 1.181818;
    color: ${(props) => props.theme.colors.primary};

    button {
      font-family: ${(props) => props.theme.inputs.family};
      font-weight: 400;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      font-size: 2.3rem;
      line-height: 1;
      color: ${(props) => props.theme.colors.primary};
      margin: 0 0 0 1.5rem;

      &:hover,
      &:active,
      &:focus {
        color: ${(props) => props.theme.colors.beet};
      }
    }
  }

  p {
    margin: 0.5rem 0 0;
  }
`

export const FormSubmit = styled('div')`
  margin: 3rem 0 0;

  button {
    background-color: transparent;
    // min-width: 20rem;
    width: 100%;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
    }
  }
`

export const FormFooter = styled('div')`
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    text-align: center;
  }

  & > p {
    font-family: ${(props) => props.theme.inputs.family};
    font-weight: 500;
    font-size: 2rem;
    line-height: 1.15;
    margin: 1em 0;

    button {
      font-family: ${(props) => props.theme.inputs.family};
      font-weight: 500;
    }
  }
`
