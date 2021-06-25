import styled from '@emotion/styled'


const ButtonStyle = styled.button`
  label: ButtonStyle;

  width: ${(props) => props.theme.buttons.sizes.default.width};
  height: 4.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1.7rem;
  border-radius: ${(props) => props.theme.border.radius};
  border: 0.1rem solid ${(props) => props.lightMode ? props.theme.colors.tahini : props.theme.colors.paprika};
  background-color: transparent;

  span {
    color: ${(props) => props.lightMode ? props.theme.colors.tahini : props.theme.colors.paprika};
    line-height: 1;
    transition: ${(props) => props.theme.links.transition};

    &:first-of-type {
      padding: 0 0 0.2rem;
    }

    svg path,
    svg circle {
      transition: ${(props) => props.theme.links.transition};
    }
  }

  &:hover,
  &:active,
  &:focus {
    border: 0.1rem solid ${(props) => props.lightMode ? props.theme.colors.tahini : props.theme.links.primary.hover};
    background-color: ${(props) => props.lightMode ? props.theme.colors.tahini : props.theme.links.primary.hover};

    span {
      color: ${(props) => props.lightMode ? props.theme.colors.pepper : props.theme.colors.light};
    }

    span:last-of-type path,
    span:last-of-type circle {
      stroke: ${(props) => props.lightMode ? props.theme.colors.pepper : props.theme.colors.light};
    }
  }
`

export default ButtonStyle;
