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
  placeholder = '',
  disabled = false,
  readOnly = false,
  required = false,
  classes = '',
}) => {
  return (
    <label htmlFor={name} className={`form__input ${classes}`}>
      <Label text={label} required={required} />
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        autoComplete={type === 'password' ? `current-${name}` : null}
        onChange={onChange}
      />
      {error ? <Error error={error} /> : null}
    </label>
  )
}

Input.displayName = 'Input'
Input.propTypes = {
  label: propTypes.string,
  disabled: propTypes.bool,
  type: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  placeholder: propTypes.string,
  required: propTypes.bool,
  readOnly: propTypes.bool,
  handler: propTypes.func,
  error: propTypes.string,
}
