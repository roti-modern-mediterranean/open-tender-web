import React from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeModifierNames } from './utils/cart'

const CartItem = ({ item, showModifiers, editItem, removeItem, children }) => {
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const desc = showModifiers ? makeModifierNames(item) : item.description
  const price =
    editItem || showModifiers ? item.totalPrice / item.quantity : item.price

  return (
    <span className="builder__option border-color">
      <span
        className="builder__option__image bg-image bg-secondary-color border-radius-small"
        style={bgStyle}
      >
        &nbsp;
      </span>
      <span className="builder__option__info">
        <span className="builder__option__name font-size-small ot-bold">
          {item.name}
        </span>
        {desc && (
          <span className="builder__option__desc font-size-x-small secondary-color">
            {desc}
          </span>
        )}
        <span className="builder__option__details font-size-small">
          <span className="builder__option__details__container">
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
                {item.cals && (
                  <span className="builder__option__details__cals secondary-color">
                    {item.cals} cal
                  </span>
                )}
                {item.allergens.length > 0 && (
                  <span className="builder__option__details__allergens ot-alert-color font-size-x-small">
                    {item.allergens.join(', ')}
                  </span>
                )}
                {item.tags.length > 0 && (
                  <span className="builder__option__details__tags secondary-color font-size-x-small">
                    {item.tags.join(', ')}
                  </span>
                )}
              </>
            )}
          </span>
        </span>
      </span>
      <span className="builder__option__quantity">{children}</span>
    </span>
  )
}

CartItem.displayName = 'CartItem'
CartItem.propTypes = {
  item: propTypes.object,
  showModifiers: propTypes.bool,
  editItem: propTypes.func,
  removeItem: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CartItem
