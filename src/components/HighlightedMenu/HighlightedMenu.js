import styled from '@emotion/styled'

const HighlightedMenu = styled.div`
  label: HighlightedMenu;

  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 37rem;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.light};
`

export default HighlightedMenu
