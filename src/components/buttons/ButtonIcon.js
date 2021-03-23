import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'

import { selectTheme } from '../../slices'

const ButtonIconView = styled('button')`
  position: relative;
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
  color,
  size = 25,
  offset = 'left',
  label,
  onClick,
  disabled,
  style = null,
  children,
}) => {
  const width = `${(parseFloat(size) / 10.0).toFixed(1)}rem`
  const margin = `${(parseFloat((size - 50) / 2) / 10.0).toFixed(1)}rem`
  const theme = useSelector(selectTheme)
  const iconColor =
    color || (isBrowser ? theme.colors.paprika : theme.colors.beet)

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
      <span>{icon({ size: width, color: iconColor })}</span>
      {children}
    </ButtonIconView>
  )
}

ButtonIcon.displayName = 'ButtonIcon'
ButtonIcon.propTypes = {
  icon: propTypes.func,
  size: propTypes.number,
  label: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default ButtonIcon
