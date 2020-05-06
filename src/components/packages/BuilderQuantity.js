import propTypes from 'prop-types'
import React from 'react'
import { Plus, Minus } from 'react-feather'

const BuilderQuantity = ({
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

BuilderQuantity.displayName = 'BuilderQuantity'
BuilderQuantity.propTypes = {
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

export default BuilderQuantity
