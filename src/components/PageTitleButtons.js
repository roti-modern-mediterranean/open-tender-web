import styled from '@emotion/styled'

const PageTitleButtons = styled('div')`
  display: flex;
  justify-content: center;
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.padding} auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }

  button {
    max-width: 24rem;
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0 0 1rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      max-width: 100%;
    }

    &:last-of-type {
      margin: 0;
    }
  }
`

export default PageTitleButtons
