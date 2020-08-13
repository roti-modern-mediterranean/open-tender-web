import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addCustomerFavorite, removeCustomerFavorite } from '@open-tender/redux'
import { makeSimpleCart } from '@open-tender/js'

import iconMap from '../iconMap'

const ButtonFavorite = ({ item, favoriteId, classes = '' }) => {
  const dispatch = useDispatch()

  const handleAdd = (evt) => {
    evt.preventDefault()
    const cart = makeSimpleCart([item])[0]
    delete cart.quantity
    const data = { cart }
    dispatch(addCustomerFavorite(data))
    evt.target.blur()
  }

  const handleRemove = (evt) => {
    evt.preventDefault()
    dispatch(removeCustomerFavorite(favoriteId))
    evt.target.blur()
  }

  const favClass = favoriteId ? 'ot-btn--highlight' : ''
  const klass = `ot-btn favorite ${classes} ${favClass}`
  const handler = favoriteId ? handleRemove : handleAdd

  return (
    <button
      className={klass}
      onClick={handler}
      aria-label={favoriteId ? 'Remove favorite' : 'Add favorite'}
    >
      <span className="favorite__icon">{iconMap['Heart']}</span>
    </button>
  )
}

ButtonFavorite.displayName = 'ButtonFavorite'
ButtonFavorite.propTypes = {
  item: propTypes.object,
  favoriteId: propTypes.number,
  classes: propTypes.string,
}

export default ButtonFavorite
