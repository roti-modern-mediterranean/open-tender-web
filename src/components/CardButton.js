import styled from '@emotion/styled'
import { ButtonSmall } from './buttons'

const CardButton = styled(ButtonSmall)`
  margin: 0 0 0 1.6rem;
  color: ${(props) =>
    props.secondary
      ? props.theme.links.primary.color
      : props.theme.fonts.headings.color};
  border: 0.1rem solid ${(props) => props.theme.links.primary.color};
  background-color: ${(props) =>
    props.secondary ? 'transparent' : props.theme.links.primary.color};

  &:hover:enabled,
  &:active:enabled {
    color: ${(props) => props.theme.fonts.headings.color};
    border-color: ${(props) => props.theme.links.primary.hover};
    background-color: ${(props) => props.theme.links.primary.hover};
  }

  &:focus {
    outline: none;
    box-shadow: ${(props) =>
      props.secondary ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.25)'};
  }
`

export default CardButton
