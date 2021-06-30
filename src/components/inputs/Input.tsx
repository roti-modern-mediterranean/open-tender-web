import React, { ChangeEventHandler, CSSProperties } from 'react'
import { Label } from '.'

interface InputProps {
  icon?: JSX.Element,
  label: string,
  showLabel?: boolean,
  name: string,
  type: string,
  value: string | number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  error?: string,
  disabled?: boolean,
  readOnly?: boolean,
  required?: boolean,
  autoComplete?: string,
  pattern?: string,
  min?: number,
  max?: number,
  placeholder?: string,
  style?: CSSProperties,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon = null,
      label,
      name,
      type,
      value,
      onChange,
      error = "",
      showLabel = true,
      placeholder = '',
      disabled = false,
      readOnly = false,
      required = false,
      autoComplete,
      pattern,
      min,
      max,
      children,
      style = null,
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
        disabled={disabled}
        style={style}
      >
        <input
          aria-label={label}
          id={name}
          name={name}
          type={type}
          pattern={pattern}
          min={min}
          max={max}
          autoComplete={autoComplete || undefined}
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

export default Input
