import React from 'react'
import propTypes from 'prop-types'
import { Heart } from 'react-feather'

const OrderQuantity = ({ item, addFavorite, removeFavorite }) => {
  return (
    <div className="order__quantity">
      <div className="order__quantity__count ot-input-quantity ot-bold font-size-small">
        {item.quantity}
      </div>
      <button className="order__quantity__favorite btn" onClick={addFavorite}>
        <span className="order__quantity__favorite__icon">
          <Heart size={null} />
        </span>
      </button>
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
