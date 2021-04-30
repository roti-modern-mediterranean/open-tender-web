import React, { useContext, useRef } from 'react'
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
import { MenuContext, MenuActiveContext } from './Menu'
import MenuItemDefault from './MenuItemDefault'
import MenuItemSmall from './MenuItemSmall'

const MenuItem = ({ item, category, isInverted }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const container = useRef(null)
  const viewRef = useRef(null)
  const addRef = useRef(null)
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext) || {}
  const { activeItem, setActiveItem } = useContext(MenuActiveContext) || {}
  const menuSlug = useSelector(selectMenuSlug)
  const {
    menuImages: showImage,
    calories: showCals,
    // tags: showTags,
    allergens: showAllergens,
  } = useSelector(selectDisplaySettings)
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
  const { item: builtItem } = useBuilder(item, soldOut)
  const { groups, totalPrice } = builtItem
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const { appearance } = category || {}
  const isSmall = appearance === 'small'
  const isActive = activeItem === item.id
  const hideView = isSmall && !isIncomplete

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

  const handleOrder = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    history.push(`/locations`)
  }

  const handleClick = (evt) => {
    if (isSoldOut) return
    if (activeItem === item.id) {
      // viewRef.current.blur()
      // addRef.current && addRef.current.blur()
      // setActiveItem(null)
      handleView(evt)
    } else {
      hideView ? addRef.current.focus() : viewRef.current.focus()
    }
  }

  const props = {
    menuConfig,
    onClick: (evt) => handleClick(evt),
    isInverted,
    isSoldOut,
    isIncomplete,
    item,
    imageUrl,
    allergenAlert,
    price,
    cals,
    viewRef: hideView ? null : viewRef,
    addRef,
    handleView,
    handleAdd,
    handleOrder,
    activeItem,
    setActiveItem,
    isActive,
  }

  return isSmall ? (
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
