import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

const Textarea = React.forwardRef(
  (
    {
      icon = null,
      label,
      name,
      value,
      onChange,
      error,
      showLabel = true,
      placeholder = '',
      disabled = false,
      readOnly = false,
      required = false,
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
        <textarea
          aria-label={label}
          id={name}
          name={name}
          value={value || ''}
          placeholder={placeholder || ''}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          ref={ref}
        />
      </Label>
    )
  }
)

Textarea.displayName = 'Textarea'
Textarea.propTypes = {
  icon: propTypes.element,
  showLabel: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  placeholder: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Textarea
