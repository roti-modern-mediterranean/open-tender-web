import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonStyled, Heading } from '@open-tender/components'

const ButtonToggleView = styled('div')`
  width: 100%;

  button,
  button:hover,
  button:active,
  button:focus {
    width: 100%;
    padding: 1.4rem 0 1.5rem;
    opacity: 1;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.13);
    border-radius: ${(props) => props.theme.border.radius};
    background-color: ${(props) => props.theme.colors.light};
    border-color: ${(props) => props.theme.colors.light};

    span {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.secondary};
    }

    &:disabled {
      opacity: 1;
      background-color: ${(props) => props.theme.colors.secondary};
      border-color: ${(props) => props.theme.colors.secondary};
      box-shadow: none;

      span {
        color: ${(props) => props.theme.colors.light};
      }
    }
  }
`

const ButtonToggle = ({
  onClick,
  disabled = false,
  style = null,
  children,
}) => {
  return (
    <ButtonToggleView disabled={disabled} style={style}>
      <ButtonStyled onClick={onClick} disabled={disabled}>
        <Heading>{children}</Heading>
      </ButtonStyled>
    </ButtonToggleView>
  )
}

ButtonToggle.displayName = 'ButtonToggle'
ButtonToggle.propTypes = {
  onClick: propTypes.func,
  disabled: propTypes.bool,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default ButtonToggle
