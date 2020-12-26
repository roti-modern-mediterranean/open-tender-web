import styled from '@emotion/styled'

const FormWrapper = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

export default FormWrapper
