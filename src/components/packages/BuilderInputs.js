import propTypes from 'prop-types'
import React from 'react'

export const RadioButton = ({ groupId, option, handler, classes = '' }) => {
  const price = parseFloat(option.price).toFixed(2)
  return (
    <label htmlFor={option.id} className={`label radio ${classes}`}>
      <input
        id={option.id}
        type="radio"
        name={groupId}
        className="radio__input"
        value={option.id}
        checked={option.quantity >= 1}
        onChange={handler}
      />
      <span className="radio__custom" />
      <span className="radio__desc">
        {option.name} ${price}
      </span>
    </label>
  )
}

RadioButton.displayName = 'RadioButton'
RadioButton.propTypes = {
  groupId: propTypes.number,
  option: propTypes.object,
  handler: propTypes.func,
  classes: propTypes.string,
}

export const RadioButtonGroup = ({ id, options, handler }) => {
  return (
    <fieldset>
      {options.map((option) => (
        <RadioButton
          key={option.id}
          groupId={id}
          option={option}
          handler={handler}
        />
      ))}
    </fieldset>
  )
}

RadioButtonGroup.displayName = 'RadioButtonGroup'
RadioButtonGroup.propTypes = {
  id: propTypes.number,
  options: propTypes.array,
  handler: propTypes.func,
}

export const QuantityInput = ({
  name,
  id,
  value,
  handler,
  classes = '',
  readOnly = false,
}) => {
  return (
    <label htmlFor={id} className={`label ${classes}`}>
      <input
        id={id}
        type="number"
        value={value}
        onChange={handler}
        aria-label={name}
        readOnly={readOnly}
      />
    </label>
  )
}

QuantityInput.displayName = 'QuantityInput'
QuantityInput.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
  value: propTypes.oneOfType([propTypes.number, propTypes.string]),
  handler: propTypes.func,
  classes: propTypes.string,
  readOnly: propTypes.bool,
}
