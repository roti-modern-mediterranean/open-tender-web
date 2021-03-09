import styled from '@emotion/styled'

const PageMain = styled('div')`
  width: 100%;
  max-width: 112rem;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

export default PageMain
