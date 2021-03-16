import styled from '@emotion/styled'

const PageContainer = styled('div')`
  width: 100%;
  max-width: ${(props) => props.theme.layout.containerMaxWidth};
  margin: ${(props) => props.theme.layout.margin} auto;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} auto;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

export default PageContainer
