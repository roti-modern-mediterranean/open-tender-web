import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItem, selectCartCounts } from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'
import { MenuContext } from './pages/MenuPage'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const { soldOut, menuConfig } = useContext(MenuContext)
  const { image: soldOutImage, message: soldOutMsg } = menuConfig.soldOut
  const cartCounts = useSelector(selectCartCounts)
  const isSoldOut = soldOut.includes(item.id)
  const cartCount = cartCounts[item.id] || 0
  const smallImg = item.small_image_url
  const bgImage = isSoldOut && soldOutImage ? soldOutImage : smallImg
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null

  const handleClick = (evt) => {
    evt.preventDefault()
    if (!isSoldOut) {
      dispatch(setCurrentItem(item))
      dispatch(openModal({ type: 'item' }))
    }
    evt.target.blur()
  }

  return (
    <div className={`menu__item ${isSoldOut ? '-sold-out' : ''}`}>
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
          {isSoldOut && soldOutMsg && (
            <div className="menu__item__sold-out overlay-dark border-radius">
              <div className="menu__item__sold-out__container">
                <p className="ot-light-color ot-bold ot-upper font-size-x-big">
                  {soldOutMsg}
                </p>
              </div>
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
}

export default MenuItem
