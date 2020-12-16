import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const HeaderButtonContainer = styled('button')`
  cursor: pointer;
  // display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  text-align: center;
  width: 4.4rem;
  height: 4.4rem;
  border: 0;
  margin: 0;
  color: ${(props) =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.fonts.headings.color};
  transition: ${(props) => props.theme.links.transition};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};

  & > span {
    display: block;
    // width: 2rem;
    // height: 2rem;
  }
`

const HeaderButton = ({
  label,
  onClick,
  color,
  disabled,
  children,
  style = null,
}) => {
  const onUp = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <HeaderButtonContainer
      type="button"
      aria-label={label || null}
      onPointerUp={(evt) => onUp(evt)}
      disabled={disabled}
      color={color}
      style={style}
    >
      <span>{children}</span>
    </HeaderButtonContainer>
  )
}

HeaderButton.displayName = 'HeaderButton'
HeaderButton.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
  color: propTypes.string,
  disabled: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default HeaderButton
