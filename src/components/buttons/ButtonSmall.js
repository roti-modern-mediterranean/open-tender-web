import styled from '@emotion/styled'

const ButtonSmall = styled('button')`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  display: block;
  padding: 0.8rem 1.5rem 0.8rem;
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.1;
  text-transform: uppercase;
  transition: all 0.15s ease;
  border-radius: 2.5rem;
`

export default ButtonSmall
