import React, { useContext, useRef } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, showNotification } from '@open-tender/redux'
import { convertStringToArray, formatDollars } from '@open-tender/js'
import { useBuilder } from '@open-tender/components'

import { selectDisplaySettings } from '../../../slices'
import { MenuContext, MenuActiveContext } from './Menu'
import MenuItemSmall from './MenuItemSmall'
import { CardListItemSmall } from '../..'

const MenuItemOption = ({
  item,
  group,
  option,
  activeOption,
  setActiveOption,
}) => {
  const dispatch = useDispatch()
  const container = useRef(null)
  // const viewRef = useRef(null)
  const addRef = useRef(null)
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext) || {}
  const { activeItem, setActiveItem } = useContext(MenuActiveContext) || {}
  const {
    menuImages: showImage,
    calories: showCals,
    // tags: showTags,
    allergens: showAllergens,
  } = useSelector(selectDisplaySettings)
  const isSoldOut = soldOut
    ? soldOut.includes(item.id) || soldOut.includes(option.id)
    : false
  const cals =
    showCals && option.nutritional_info
      ? parseInt(option.nutritional_info.calories) || null
      : null
  const allergens = showAllergens ? convertStringToArray(option.allergens) : []
  // const tags = showTags ? convertStringToArray(item.tags) : []
  const allergenAlert =
    allergenAlerts && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []
  const smallImg =
    option.small_image_url || option.app_image_url || option.big_image_url
  const imageUrl = showImage ? smallImg : null
  const { item: builtItem, setOptionQuantity } = useBuilder(item, soldOut)
  const price = formatDollars(parseFloat(item.price) + parseFloat(option.price))
  const isActive = item.id === activeItem && option.id === activeOption

  const setActive = (optionId) => {
    setActiveItem(item.id)
    setActiveOption(optionId)
  }

  const handleClick = () => {
    if (isSoldOut) return
    if (isActive) {
      addRef.current && addRef.current.blur()
      setActiveItem(null)
      setActiveOption(null)
      setOptionQuantity(group.id, option.id, 0)
    } else {
      addRef.current.focus()
      setOptionQuantity(group.id, option.id, 1)
    }
  }

  const handleAdd = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!isSoldOut) {
      dispatch(addItemToCart(builtItem))
      dispatch(showNotification(`${option.name} added to cart!`))
    }
  }

  const props = {
    menuConfig,
    onClick: (evt) => handleClick(evt),
    isIncomplete: false,
    isSoldOut,
    item: option,
    imageUrl,
    allergenAlert,
    price,
    cals,
    // viewRef,
    addRef,
    // handleView,
    handleAdd,
    activeItem,
    setActiveItem: setActive,
    isActive,
  }
  return (
    <CardListItemSmall>
      <MenuItemSmall ref={container} {...props} />
    </CardListItemSmall>
  )
}

MenuItemOption.displayName = 'MenuItemOption'
MenuItemOption.propTypes = {
  item: propTypes.object,
  group: propTypes.object,
  option: propTypes.object,
  activeOption: propTypes.number,
  setActiveOption: propTypes.func,
}

export default MenuItemOption
