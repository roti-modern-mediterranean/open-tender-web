import styled from '@emotion/styled'

const Section = styled('div')`
  overflow: hidden;
  margin: ${(props) => props.theme.layout.padding} 0;
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   margin: ${(props) => props.theme.layout.paddingMobile} 0;
  // }
`

export default Section
