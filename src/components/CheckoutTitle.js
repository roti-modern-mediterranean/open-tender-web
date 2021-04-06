import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

const CheckoutTitle = styled(Heading)`
  display: block;
  width: 100%;
  color: ${(props) => props.theme.colors.primary};
  font-size: 3.8rem;
  line-height: 1;
`

export default CheckoutTitle
