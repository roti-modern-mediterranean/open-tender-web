import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

const Input = React.forwardRef(
  (
    {
      icon = null,
      label,
      name,
      type,
      value,
      onChange,
      error,
      showLabel = true,
      placeholder = '',
      disabled = false,
      readOnly = false,
      required = false,
      autoComplete = null,
      pattern = null,
      min = null,
      max = null,
      children,
    },
    ref
  ) => {
    return (
      <Label
        htmlFor={name}
        icon={icon}
        text={label}
        value={value}
        required={required}
        errMsg={error}
        showLabel={showLabel}
      >
        <input
          aria-label={label}
          id={name}
          name={name}
          type={type}
          pattern={pattern}
          min={min}
          max={max}
          autoComplete={autoComplete || null}
          value={value || ''}
          placeholder={placeholder || ''}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          ref={ref}
        />
        {children}
      </Label>
    )
  }
)

Input.displayName = 'Input'
Input.propTypes = {
  icon: propTypes.element,
  label: propTypes.string,
  showLabel: propTypes.bool,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  autoComplete: propTypes.string,
  pattern: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  placeholder: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Input
