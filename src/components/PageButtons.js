import styled from '@emotion/styled'

const PageButtons = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: -0.5rem 0 0;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: -0.5rem -0.5rem 0;
  }

  button {
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: block;
      flex: 1 1 50%;
      padding: 1.1rem 1rem;
      margin: 0 0.5rem;
      border-radius: 2.5rem;
      line-height: 1.2;
      overflow: hidden;
    }
  }
`

export default PageButtons
