import styled from '@emotion/styled'
import { Box } from '@open-tender/components'

const FormWrapper = styled(Box)`
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

export default FormWrapper
