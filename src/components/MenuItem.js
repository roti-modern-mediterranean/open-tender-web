import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { setCurrentItem, selectCartCounts } from '@open-tender/redux'
import { convertStringToArray, makeDisplayPrice } from '@open-tender/js'

import { selectDisplaySettings, openModal } from '../slices'
import { MenuContext } from './MenuPage'
import Tag from './Tag'
import iconMap from './iconMap'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext)
  const {
    menuImages: showImage,
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = useSelector(selectDisplaySettings)
  const soldOutMsg = menuConfig.soldOutMessage || 'Sold out for day'
  const cartCounts = useSelector(selectCartCounts)
  const isSoldOut = soldOut.includes(item.id)
  const cartCount = cartCounts[item.id] || 0
  const smallImg =
    item.small_image_url || item.app_image_url || item.big_image_url
  const bgStyle = smallImg ? { backgroundImage: `url(${smallImg}` } : null
  const price = makeDisplayPrice(item)
  const cals =
    showCals && item.nutritional_info
      ? parseInt(item.nutritional_info.calories) || null
      : null
  const allergens = showAllergens ? convertStringToArray(item.allergens) : []
  const tags = showTags ? convertStringToArray(item.tags) : []
  const allergenAlert = allergens.length
    ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
    : []
  const hasAllergens = allergenAlert.length > 0
  const countFontSize = isMobile ? 'ot-font-size-x-small' : 'ot-font-size-small'
  const overlayClass = isSoldOut ? 'ot-opacity-dark' : ''
  const overlayClassName = `menu__item__overlay ot-border-radius ${overlayClass}`

  const handleClick = (evt) => {
    evt.preventDefault()
    if (!isSoldOut) {
      dispatch(setCurrentItem(item))
      dispatch(openModal({ type: 'item' }))
    }
    evt.target.blur()
  }

  const itemTag = isSoldOut ? (
    <Tag icon={iconMap['Slash']} text={soldOutMsg} bgClass="ot-dark" />
  ) : hasAllergens ? (
    <Tag
      icon={iconMap['AlertCircle']}
      text={`Contains ${allergenAlert.join(', ')}`}
      bgClass="ot-warning"
    />
  ) : null

  return (
    <div className={`menu__item ${isSoldOut ? '-sold-out' : ''}`}>
      <div className="menu__item__container ot-border-color ot-border-radius">
        {cartCount > 0 && (
          <div
            className={`menu__item__count ot-warning ot-bold ${countFontSize}`}
          >
            {cartCount}
          </div>
        )}
        {!showImage && itemTag ? (
          <div className="menu__item__alert">{itemTag}</div>
        ) : null}
        <button className="ot-font-size" onClick={handleClick}>
          {showImage && (
            <div
              className="menu__item__image bg-image ot-bg-color-secondary ot-border-radius"
              style={bgStyle}
            >
              {itemTag && (
                <div className={overlayClassName}>
                  <div className="menu__item__overlay__container">
                    {itemTag}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="menu__item__content">
            {/* <p className="menu__item__name ot-bold ot-font-size-big">{item.name}</p> */}
            <p className="menu__item__name ot-heading ot-font-size-big">
              {item.name}
            </p>
            {item.description && (
              <p className="menu__item__desc ot-font-size-small ot-color-body">
                {item.description}
              </p>
            )}
            <p className="menu__item__details">
              {price && (
                <span className="menu__item__price ot-bold ot-color-headings">
                  {price}
                </span>
              )}
              {cals && (
                <span className="menu__item__cals ot-bold ot-color-body">
                  {cals} cals
                </span>
              )}
              {allergens.length > 0 && (
                <span className="menu__item__allergens ot-color-alert ot-font-size-small">
                  {allergens.join(', ')}
                </span>
              )}
              {tags.length > 0 && (
                <span className="menu__item__tags ot-color-body ot-font-size-small">
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
