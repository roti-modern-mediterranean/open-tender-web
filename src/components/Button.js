import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ButtonView = styled('button')`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  text-align: center;
  border: 0;
  margin: 0;
  transition: ${(props) => props.theme.links.transition};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};

  & > span {
    display: block;
  }
`

const Button = ({ label, onClick, disabled, children, style = null }) => {
  const onUp = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <ButtonView
      type="button"
      aria-label={label || null}
      onPointerUp={(evt) => onUp(evt)}
      disabled={disabled}
      style={style}
    >
      <span>{children}</span>
    </ButtonView>
  )
}

Button.displayName = 'Button'
Button.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default Button
