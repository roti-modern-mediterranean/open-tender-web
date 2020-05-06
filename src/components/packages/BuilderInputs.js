import propTypes from 'prop-types'
import React from 'react'
import { Plus, Minus } from 'react-feather'

export const RadioButton = ({ option, handler, classes = '' }) => {
  const price = parseFloat(option.price).toFixed(2)
  return (
    <label htmlFor={option.id} className={`label radio ${classes}`}>
      <input
        id={option.id}
        type="radio"
        className="radio__input"
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

export const RadioButtonGroup = ({ group, handler }) => {
  return (
    <fieldset>
      {group.options.map((option) => (
        <RadioButton
          key={option.id}
          option={option}
          handler={() => handler(group.id, option.id)}
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

export const Quantity = ({
  item,
  adjust,
  increment,
  decrement,
  incrementDisabled,
  decrementDisabled,
  classes = '',
}) => {
  const handleDecrement = (evt) => {
    evt.preventDefault()
    decrement()
    evt.target.blur()
  }

  const handleAdjust = (evt) => {
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    adjust(quantity)
  }

  const handleIncrement = (evt) => {
    evt.preventDefault()
    increment()
    evt.target.blur()
  }

  return (
    <div className={`quantity ${classes}`}>
      <button
        className="btn"
        onClick={handleDecrement}
        disabled={decrementDisabled}
      >
        <Minus size={null} />
      </button>
      <label htmlFor={item.id} className={`label ${classes}`}>
        <input
          id={item.id}
          type="number"
          value={item.quantity}
          onChange={handleAdjust}
          aria-label={item.name}
        />
      </label>
      <button
        className="btn"
        onClick={handleIncrement}
        disabled={incrementDisabled}
      >
        <Plus size={null} />
      </button>
    </div>
  )
}

Quantity.displayName = 'Quantity'
Quantity.propTypes = {
  name: propTypes.string,
  id: propTypes.oneOfType([propTypes.number, propTypes.string]),
  classes: propTypes.string,
  quantity: propTypes.oneOfType([propTypes.number, propTypes.string]),
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  size: propTypes.number,
  incrementDisabled: propTypes.bool,
}
