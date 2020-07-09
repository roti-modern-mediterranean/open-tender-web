import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItem, selectCartCounts } from '@open-tender/redux'
import { convertStringToArray } from '@open-tender/js'

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
      <div className="menu__item__container ot-border-color">
        <button className="ot-font-size" onClick={handleClick}>
          <div
            className="menu__item__image bg-image ot-bg-color-secondary ot-border-radius"
            style={bgStyle}
          >
            {cartCount > 0 && (
              <div className="menu__item__count ot-warning ot-bold ot-font-size-small">
                {cartCount}
              </div>
            )}
            {isSoldOut && soldOutMsg ? (
              <div className="menu__item__overlay ot-opacity-dark ot-border-radius">
                <div className="menu__item__overlay__container">
                  <p className="menu__item__overlay__message ot-color-light ot-font-size-x-big">
                    {soldOutMsg}
                  </p>
                </div>
              </div>
            ) : (
              allergenAlert.length > 0 && (
                <div className="menu__item__overlay ot-border-radius">
                  <div className="menu__item__overlay__container">
                    <Tag
                      icon="AlertCircle"
                      text={`Contains ${allergenAlert.join(', ')}`}
                      bgClass="ot-warning"
                    />
                  </div>
                </div>
              )
            )}
          </div>
          <div className="menu__item__content">
            {/* <p className="menu__item__name ot-bold ot-font-size-big">{item.name}</p> */}
            <p className="menu__item__name ot-heading ot-font-size-big">
              {item.name}
            </p>
            {item.description && (
              <p className="menu__item__desc ot-color-secondary ot-font-size-small">
                {item.description}
              </p>
            )}
            <p className="menu__item__details">
              <span className="menu__item__price ot-bold">${item.price}</span>
              {cals && (
                <span className="menu__item__cals ot-bold ot-color-secondary">
                  {cals} cals
                </span>
              )}
              {allergens.length > 0 && (
                <span className="menu__item__allergens ot-color-alert ot-font-size-small">
                  {allergens.join(', ')}
                </span>
              )}
              {tags.length > 0 && (
                <span className="menu__item__tags ot-color-secondary ot-font-size-small">
                  {tags.join(', ')}
                </span>
              )}
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  item: propTypes.object,
}

export default MenuItem
