import React from 'react'
import propTypes from 'prop-types'
import { displayPrice } from './utils'
import BuilderQuantity from './BuilderQuantity'

const BuilderOption = ({
  group,
  option,
  adjust,
  increment,
  decrement,
  classes = '',
}) => {
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  const groupAtMin = group.min !== 0 && group.quantity === group.min
  const optionAtMin = option.min !== 0 && option.quantity === option.min
  const decrementDisabled = groupAtMin || optionAtMin || option.quantity === 0
  const bgStyle = option.imageUrl
    ? { backgroundImage: `url(${option.imageUrl}` }
    : null
  return (
    <li>
      <span className="builder__option">
        <span
          className="builder__option__image bg-image bg-secondary-color border-radius-small"
          style={bgStyle}
        >
          &nbsp;
        </span>
        <span className="builder__option__info">
          <span className="builder__option__name font-size-small ot-bold">
            {option.name}
          </span>
          {option.description && (
            <span className="builder__option__desc font-size-x-small secondary-color">
              {option.description}
            </span>
          )}
          <span className="builder__option__price font-size-small ot-bold">
            ${displayPrice(option.price)}
          </span>
        </span>
        <span className="builder__option__quantity">
          <BuilderQuantity
            item={option}
            adjust={adjust}
            increment={increment}
            decrement={decrement}
            incrementDisabled={incrementDisabled}
            decrementDisabled={decrementDisabled}
            classes={classes}
          />
        </span>
      </span>
    </li>
  )
}

BuilderOption.displayName = 'BuilderOption'
BuilderOption.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  size: propTypes.number,
  classes: propTypes.string,
}

export default BuilderOption
