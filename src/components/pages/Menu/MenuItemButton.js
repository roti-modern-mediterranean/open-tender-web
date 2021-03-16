import styled from '@emotion/styled'

const MenuItemButton = styled('button')`
  cursor: ${(props) => (props.isSoldOut ? 'default' : 'pointer')};
  display: block;
  padding: 0.9rem 1.5rem 0.8rem;
  margin: 0 0 0 1.6rem;
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.1;
  text-transform: uppercase;
  transition: all 0.15s ease;
  border-radius: 2.5rem;
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
      props.secondary ? 'none' : '0 3px 10px 0 rgba(0, 0, 0, 0.2)'};
  }
`

export default MenuItemButton
