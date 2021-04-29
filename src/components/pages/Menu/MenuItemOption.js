import React, { useContext, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setCurrentItem,
  selectMenuSlug,
  addItemToCart,
  showNotification,
} from '@open-tender/redux'
import { convertStringToArray, formatDollars, slugify } from '@open-tender/js'
import { useBuilder } from '@open-tender/components'

import { selectDisplaySettings, setTopOffset } from '../../../slices'
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
  const container = useRef(null)
  const viewRef = useRef(null)
  const addRef = useRef(null)
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext) || {}
  const { activeItem, setActiveItem } = useContext(MenuActiveContext) || {}
  const {
    menuImages: showImage,
    calories: showCals,
    // tags: showTags,
    allergens: showAllergens,
  } = useSelector(selectDisplaySettings)
  const isSoldOut = soldOut ? soldOut.includes(item.id) : false
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
  const { item: builtItem, setOptionQuantity } = useBuilder(item, soldOut)
  const smallImg =
    option.small_image_url || option.app_image_url || option.big_image_url
  const imageUrl = showImage ? smallImg : null
  console.log(builtItem.price)
  const price = formatDollars(builtItem.price)
  const isActive = item.id === activeItem && option.id === activeOption

  // useEffect(() => {
  //   setOptionQuantity(group.id, option.id, 1)
  // }, [setOptionQuantity, group.id, option.id])

  // const handleClick = () => {
  //   if (isSoldOut) return
  //   if (activeItem === item.id) {
  //     viewRef.current.blur()
  //     addRef.current && addRef.current.blur()
  //     setActiveItem(null)
  //   } else {
  //     viewRef.current.focus()
  //   }
  // }

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
    } else {
      addRef.current.focus()
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
    // handleAdd,
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

export default MenuItemOption
