import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItem, selectCartCounts } from 'open-tender-redux'
import { convertStringToArray } from 'open-tender-js'

import { openModal } from '../slices'
import { MenuContext } from './MenuPage'
import Tag from './Tag'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext)
  const { displayCalories, displayAllergens, displayTags } = menuConfig
  const { image: soldOutImage, message: soldOutMsg } = menuConfig.soldOut
  const cartCounts = useSelector(selectCartCounts)
  const isSoldOut = soldOut.includes(item.id)
  const cartCount = cartCounts[item.id] || 0
  const smallImg = item.small_image_url
  const bgImage = isSoldOut && soldOutImage ? soldOutImage : smallImg
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const cals =
    displayCalories && item.nutritional_info
      ? parseInt(item.nutritional_info.calories) || null
      : null
  const allergens = displayAllergens ? convertStringToArray(item.allergens) : []
  const tags = displayTags ? convertStringToArray(item.tags) : []
  const allergenAlert = allergens.length
    ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
    : []

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
          {isSoldOut && soldOutMsg ? (
            <div className="menu__item__overlay overlay-dark border-radius">
              <div className="menu__item__overlay__container">
                <p className="ot-light-color ot-bold ot-upper font-size-x-big">
                  {soldOutMsg}
                </p>
              </div>
            </div>
          ) : (
            allergenAlert.length > 0 && (
              <div className="menu__item__overlay border-radius">
                <div className="menu__item__overlay__container">
                  {/* <p className="ot-light-color ot-bold ot-upper font-size-x-big">
                    Contains {allergenAlert.join(', ')}
                  </p> */}
                  <Tag
                    icon="AlertCircle"
                    text={`Contains ${allergenAlert.join(', ')}`}
                    bgClass="bg-alert-color"
                    textClass="ot-light-color"
                  />
                </div>
              </div>
            )
          )}
        </div>
        <div className="menu__item__content">
          {/* <p className="menu__item__name ot-bold font-size-big">{item.name}</p> */}
          <p className="menu__item__name heading ot-font-size-h5">
            {item.name}
          </p>
          {item.description && (
            <p className="menu__item__desc font-size-small">
              {item.description}
            </p>
          )}
          <p className="menu__item__details">
            <span className="menu__item__price ot-bold">${item.price}</span>
            {cals && (
              <span className="menu__item__cals ot-bold secondary-color">
                {cals} cals
              </span>
            )}
            {allergens.length > 0 && (
              <span className="menu_item__allergens ot-alert-color font-size-small">
                {allergens.join(', ')}
              </span>
            )}
            {tags.length > 0 && (
              <span className="menu_item__tags secondary-color font-size-small">
                {tags.join(', ')}
              </span>
            )}
          </p>
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
