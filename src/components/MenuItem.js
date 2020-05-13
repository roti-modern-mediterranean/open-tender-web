import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItem, selectCartCounts } from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const cartCounts = useSelector(selectCartCounts)
  const cartCount = cartCounts[item.id] || 0
  const smallImg = item.small_image_url
  const bgStyle = smallImg ? { backgroundImage: `url(${smallImg}` } : null

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(setCurrentItem(item))
    dispatch(openModal('item'))
    evt.target.blur()
  }

  return (
    <div className="menu__item">
      <button className="font-size" onClick={handleClick}>
        <div
          className="menu__item__image bg-image bg-secondary-color border-radius"
          style={bgStyle}
        >
          {cartCount > 0 && (
            <div className="menu__item__count btn--cart-count font-size-small">
              {cartCount}
            </div>
          )}
        </div>
        <div className="menu__item__content">
          <p className="menu__item__name ot-bold">{item.name}</p>
          {item.description && (
            <p className="menu__item__desc font-size-small">
              {item.description}
            </p>
          )}
          <p className="menu__item__price">${item.price}</p>
        </div>
      </button>
    </div>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  item: propTypes.object,
  handler: propTypes.func,
  isPreview: propTypes.bool,
}

export default MenuItem
