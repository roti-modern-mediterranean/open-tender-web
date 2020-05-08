import React from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeModifierNames } from './utils'

const BuilderOptionWrapper = ({ option, isCart, children }) => {
  const bgStyle = option.imageUrl
    ? { backgroundImage: `url(${option.imageUrl}` }
    : null
  const desc = isCart ? makeModifierNames(option) : option.description
  const price = isCart ? option.totalPrice : option.price
  return (
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
        {desc && (
          <span className="builder__option__desc font-size-x-small secondary-color">
            {desc}
          </span>
        )}
        <span className="builder__option__price font-size-small ot-bold">
          ${displayPrice(price)}
        </span>
      </span>
      <span className="builder__option__quantity">{children}</span>
    </span>
  )
}

BuilderOptionWrapper.displayName = 'BuilderOptionWrapper'
BuilderOptionWrapper.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  size: propTypes.number,
  classes: propTypes.string,
}

export default BuilderOptionWrapper
