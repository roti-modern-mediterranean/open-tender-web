import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { MinusSign, PlusSign } from '../icons'
import { CartItemQuantity } from '..'

const QuantityView = styled('div')`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 9.2rem;
  text-align: center;

  label {
    display: block;

    input {
      text-align: center;
    }
  }

  button {
    transition: none;
    &:disabled {
      opacity: 0.25;
    }

    &:focus {
      outline: none;
    }
  }
`

const Quantity = ({ id, name, quantity, update, iconMap = {} }) => {
  const adjust = (evt) => {
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    update(quantity)
  }

  const increment = (evt) => {
    evt.preventDefault()
    update(quantity + 1)
  }

  const decrement = (evt) => {
    evt.preventDefault()
    if (quantity > 0) update(quantity - 1)
  }

  return (
    <CartItemQuantity>
      <QuantityView>
        <button
          type="button"
          onClick={decrement}
          disabled={quantity === 0}
          aria-label={`Decrease ${name} quantity`}
        >
          <MinusSign />
        </button>
        <label htmlFor={id}>
          <input
            id={id}
            type="number"
            value={quantity}
            onChange={adjust}
            aria-label={`${name} quantity`}
          />
        </label>
        <button
          type="button"
          onClick={increment}
          aria-label={`Increase ${name} quantity`}
        >
          <PlusSign />
        </button>
      </QuantityView>
    </CartItemQuantity>
  )
}

Quantity.displayName = 'Quantity'
Quantity.propTypes = {
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  name: propTypes.string,
  quantity: propTypes.number,
  update: propTypes.func,
  iconMap: propTypes.object,
}

export default Quantity
