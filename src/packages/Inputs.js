import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Label = ({ text, required }) => (
  <span className="label ot-bold">
    {text}
    {required ? <span className="required">*</span> : null}
  </span>
)

export const Error = ({ error }) => {
  return (
    <TransitionGroup>
      {error ? (
        <CSSTransition
          key="form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <span className="form-error">
            <p>{error}</p>
          </span>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

Error.displayName = 'Error'
Error.propTypes = {
  error: propTypes.string,
}

export const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  showLabel = true,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder = '',
  classes = '',
  inputClasses = '',
}) => {
  return (
    <label htmlFor={name} className={`form__input ${classes}`}>
      {showLabel && <Label text={label} required={required} />}
      <input
        aria-label={label}
        id={name}
        name={name}
        type={type}
        autoComplete={type === 'password' ? `current-${name}` : null}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={inputClasses}
        onChange={onChange}
      />
      {error ? <Error error={error} /> : null}
    </label>
  )
}

Input.displayName = 'Input'
Input.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  placeholder: propTypes.string,
  classes: propTypes.string,
  inputClasses: propTypes.string,
}

export const Textarea = ({
  label,
  name,
  value,
  onChange,
  error,
  showLabel = true,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder = '',
  classes = '',
  inputClasses = '',
}) => {
  return (
    <label htmlFor={name} className={`form__input ${classes}`}>
      {showLabel && <Label text={label} required={required} />}
      <textarea
        aria-label={label}
        id={name}
        name={name}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={inputClasses}
        onChange={onChange}
      />
      {error ? <Error error={error} /> : null}
    </label>
  )
}

Textarea.displayName = 'Textarea'
Textarea.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  placeholder: propTypes.string,
  classes: propTypes.string,
  inputClasses: propTypes.string,
}

export const Switch = ({ label, id, on, onChange, disabled, classes = '' }) => {
  return (
    <label htmlFor={id} className={`label switch ${classes}`}>
      <input
        aria-label={label}
        id={id}
        type="checkbox"
        className="switch__input"
        checked={on}
        disabled={disabled}
        onChange={onChange}
      />
      <span className="switch__toggle" />
    </label>
  )
}

Switch.displayName = 'Switch'
Switch.propTypes = {
  id: propTypes.string,
  checked: propTypes.bool,
  disabled: propTypes.bool,
  handler: propTypes.func,
  klass: propTypes.string,
}
