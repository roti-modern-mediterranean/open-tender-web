import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setCurrentItem } from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const smallImg = item.small_image_url
  const bgStyle = smallImg ? { backgroundImage: `url(${smallImg}` } : null

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(setCurrentItem(item))
    dispatch(openModal('item'))
    evt.target.blur()
  }

  return (
    <div key={item.id} className="menu__item">
      <button className="font-size" onClick={handleClick}>
        {smallImg && (
          <div
            className="menu__item__image bg-image bg-secondary-color border-radius"
            style={bgStyle}
          />
        )}
        <div className="menu__item__content">
          <h3 className="menu__item__name font-size-big">{item.name}</h3>
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
