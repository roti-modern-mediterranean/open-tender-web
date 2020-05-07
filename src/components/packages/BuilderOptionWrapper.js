import React from 'react'
import propTypes from 'prop-types'
import { displayPrice } from './utils'

const BuilderOptionWrapper = ({ option, children }) => {
  const bgStyle = option.imageUrl
    ? { backgroundImage: `url(${option.imageUrl}` }
    : null
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
        {option.description && (
          <span className="builder__option__desc font-size-x-small secondary-color">
            {option.description}
          </span>
        )}
        <span className="builder__option__price font-size-small ot-bold">
          ${displayPrice(option.price)}
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
