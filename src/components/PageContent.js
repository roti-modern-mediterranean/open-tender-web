import styled from '@emotion/styled'

const PageContent = styled('div')`
  margin: 0 0 4rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay || '0.25s'}
    forwards;

  > p {
    line-height: ${(props) => props.theme.lineHeight};
  }
`

export default PageContent
