import React, { useContext, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setCurrentItem,
  selectMenuSlug,
  addItemToCart,
  showNotification,
} from '@open-tender/redux'
import {
  convertStringToArray,
  makeDisplayPrice,
  slugify,
} from '@open-tender/js'
import { useBuilder } from '@open-tender/components'

import { selectDisplaySettings, setTopOffset } from '../../../slices'
import iconMap from '../../iconMap'
import { Tag } from '../..'
import { MenuContext } from './Menu'
import MenuItemDefault from './MenuItemDefault'
import MenuItemSmall from './MenuItemSmall'

const MenuItem = ({ item, category, isInverted }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const container = useRef(null)
  const viewRef = useRef(null)
  const addRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext) || {}
  const menuSlug = useSelector(selectMenuSlug)
  const {
    menuImages: showImage,
    calories: showCals,
    // tags: showTags,
    allergens: showAllergens,
  } = useSelector(selectDisplaySettings)
  const soldOutMsg = menuConfig
    ? menuConfig.soldOutMessage || 'Sold out for day'
    : null
  const isSoldOut = soldOut ? soldOut.includes(item.id) : false
  // const cartCounts = useSelector(selectCartCounts)
  // const cartCount = cartCounts[item.id] || 0
  const smallImg =
    item.small_image_url || item.app_image_url || item.big_image_url
  const imageUrl = showImage ? smallImg : null
  const price = makeDisplayPrice(item)
  const cals =
    showCals && item.nutritional_info
      ? parseInt(item.nutritional_info.calories) || null
      : null
  const allergens = showAllergens ? convertStringToArray(item.allergens) : []
  // const tags = showTags ? convertStringToArray(item.tags) : []
  const allergenAlert =
    allergenAlerts && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []
  const hasAllergens = allergenAlert.length > 0
  const itemTag = isSoldOut ? (
    <Tag icon={iconMap.Slash} text={soldOutMsg} bgColor="alert" />
  ) : hasAllergens ? (
    <Tag
      icon={iconMap.AlertCircle}
      text={`Contains ${allergenAlert.join(', ')}`}
      bgColor="error"
    />
  ) : null
  const { item: builtItem } = useBuilder(item, soldOut)
  const { groups, totalPrice } = builtItem
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const { appearance } = category || {}

  const handleView = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!isSoldOut) {
      const mainElement = document.getElementById('main')
      const mainOffset = mainElement.getBoundingClientRect().top
      dispatch(setTopOffset(-mainOffset))
      dispatch(setCurrentItem(item))
      history.push(`${menuSlug}/item/${slugify(item.name)}`)
    }
  }

  const handleAdd = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!isSoldOut && !isIncomplete) {
      dispatch(addItemToCart(builtItem))
      dispatch(showNotification(`${builtItem.name} added to cart!`))
    }
  }

  const handleClick = () => {
    if (isActive) {
      viewRef.current.blur()
      addRef.current && addRef.current.blur()
      setIsActive(false)
    } else {
      viewRef.current.focus()
    }
  }

  const props = {
    menuConfig,
    onClick: (evt) => handleClick(evt),
    isActive,
    isInverted,
    isSoldOut,
    isIncomplete,
    item,
    imageUrl,
    itemTag,
    price,
    cals,
    viewRef,
    addRef,
    handleView,
    handleAdd,
    setIsActive,
  }

  return appearance === 'small' ? (
    <MenuItemSmall ref={container} {...props} />
  ) : (
    <MenuItemDefault ref={container} {...props} />
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  item: propTypes.object,
  category: propTypes.object,
  isInverted: propTypes.bool,
}

export default MenuItem
