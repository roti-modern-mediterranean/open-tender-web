import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'

const ButtonIconView = styled('button')`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border: 0;
  margin: 0;
  margin-left: ${(props) => (props.offset === 'left' ? props.margin : '0')};
  margin-right: ${(props) => (props.offset === 'right' ? props.margin : '0')};
  transition: ${(props) => props.theme.links.transition};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};

  & > span {
    display: block;
    line-height: 0;
    width: ${(props) => props.size};
  }
`

const ButtonIcon = ({
  icon,
  size = 25,
  offset = 'left',
  label,
  onClick,
  disabled,
  style = null,
}) => {
  const width = `${(parseFloat(size) / 10.0).toFixed(1)}rem`
  const margin = `${(parseFloat((size - 50) / 2) / 10.0).toFixed(1)}rem`
  const color = isBrowser ? '#E73C3E' : '#621C27'

  const handeClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <ButtonIconView
      type="button"
      aria-label={label || null}
      onClick={(evt) => handeClick(evt)}
      disabled={disabled}
      size={width}
      offset={offset}
      margin={margin}
      style={style}
    >
      <span>{icon({ size: width, color })}</span>
    </ButtonIconView>
  )
}

ButtonIcon.displayName = 'ButtonIcon'
ButtonIcon.propTypes = {
  icon: propTypes.element,
  size: propTypes.number,
  label: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  style: propTypes.object,
}

export default ButtonIcon
