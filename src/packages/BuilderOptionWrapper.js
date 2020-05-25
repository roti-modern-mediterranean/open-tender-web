import React from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeModifierNames } from './utils/cart'

const BuilderOptionWrapper = ({ option, editItem, removeItem, children }) => {
  const bgStyle = option.imageUrl
    ? { backgroundImage: `url(${option.imageUrl}` }
    : null
  const desc = editItem ? makeModifierNames(option) : option.description
  const price = editItem ? option.totalPrice / option.quantity : option.price

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
        <span className="builder__option__details font-size-small">
          <span className="builder__option__details__price ot-bold">
            ${displayPrice(price)}
          </span>
          {editItem ? (
            <>
              <span className="builder__option__details__edit">
                <button className="btn-link" onClick={editItem}>
                  edit
                </button>
              </span>
              <span className="builder__option__details__remove">
                <button className="btn-link ot-error" onClick={removeItem}>
                  remove
                </button>
              </span>
            </>
          ) : (
            <>
              {option.cals && (
                <span className="builder__option__details__cals ot-bold secondary-color">
                  {option.cals} cal
                </span>
              )}
              {option.allergens && (
                <span className="builder__option__details__allergens ot-alert-color">
                  {option.allergens}
                </span>
              )}
              {option.tags && (
                <span className="builder__option__details__tags secondary-color">
                  {option.tags}
                </span>
              )}
            </>
          )}
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
