import React, { ChangeEventHandler } from 'react'
import { Label } from '.'

interface TextareaProps {
  icon?: JSX.Element
  showLabel?: boolean
  label: string
  name: string
  value: string | number
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  error?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  placeholder?: string
  className?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      icon = null,
      showLabel = true,
      label,
      name,
      value,
      onChange,
      error = '',
      disabled = false,
      readOnly = false,
      required = false,
      placeholder = '',
      className = undefined,
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
        className={className}
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

export default Textarea
