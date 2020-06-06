import React from 'react'
import propTypes from 'prop-types'
import { Heart } from 'react-feather'
import { makeSimpleCart } from './utils/cart'

const ButtonFavorite = ({ handler, classes = '' }) => {
  const klass = `order__quantity__favorite btn ${classes}`
  return (
    <button className={klass} onClick={handler}>
      <span className="order__quantity__favorite__icon">
        <Heart size={null} />
      </span>
    </button>
  )
}

const OrderQuantity = ({ item, addFavorite, removeFavorite }) => {
  const handleAdd = (evt) => {
    evt.preventDefault()
    const cart = makeSimpleCart([item])[0]
    addFavorite(cart)
    evt.target.blur()
  }

  const handleRemove = (evt) => {
    evt.preventDefault()
    removeFavorite(item.id)
    evt.target.blur()
  }

  return (
    <div className="order__quantity">
      <div className="order__quantity__count ot-input-quantity ot-bold font-size-small">
        {item.quantity}
      </div>
      {item.favoriteId ? (
        <ButtonFavorite handler={handleRemove} classes="btn--highlight" />
      ) : (
        <ButtonFavorite handler={handleAdd} />
      )}
    </div>
  )
}

OrderQuantity.displayName = 'Order'
OrderQuantity.propTypes = {
  item: propTypes.object,
  addFavorite: propTypes.func,
  removeFavorite: propTypes.func,
}
export default OrderQuantity
