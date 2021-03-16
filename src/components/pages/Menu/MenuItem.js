import React, { useContext, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { setCurrentItem } from '@open-tender/redux'
import { convertStringToArray, makeDisplayPrice } from '@open-tender/js'
import { Box, Heading, Preface } from '@open-tender/components'

import { selectDisplaySettings, openModal } from '../../../slices'
import iconMap from '../../iconMap'
import { Tag } from '../..'
import { MenuContext } from './Menu'
import { MenuItemButton, MenuItemImage } from '.'

const MenuItemView = styled('div')`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 17rem;
  cursor: pointer;
`

export const MenuItemContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
`

export const MenuItemImageView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 17rem;
  height: 17rem;
  transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top left;
  transform: scale(1) translate3D(0, 0, 0);

  .item-active & {
    transform: scale(0.43) translate3D(0, 1.8rem, 0);
  }
`

export const MenuItemOverlay = styled('div')`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${(props) => props.theme.border.radius};
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: ${(props) =>
    props.isSoldOut ? props.theme.overlay.dark : 'transparent'};
`

const MenuItemContent = styled('div')`
  min-height: 11.5rem;
  padding: 2rem 2rem 2rem 7.5rem;
  margin: 0 0 0 11rem;
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
    props.theme.bgColors[props.isInverted ? 'primary' : 'secondary']};

  .item-active & {
    min-height: 100%;
    padding: 2rem 2rem 2rem 7.5rem;
    margin: 0 0 0 2rem;
    background-color: ${(props) => props.theme.colors.light};
  }
`

const MenuItemContentHeader = styled('div')`
  display: flex;
  flex-direction: column;

  .item-active & {
    flex-direction: row;
    justify-content: space-between;
  }
`

const MenuItemName = styled('p')`
  line-height: 1.1;
  font-size: 2rem;
  color: ${(props) => props.theme.fonts.headings.color};
  transition: color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);

  .item-active & span {
    color: ${(props) => props.theme.fonts.body.color};
  }
`

const MenuItemDescription = styled('p')`
  opacity: 0;
  max-height: 0;
  padding: 0;
  line-height: ${(props) => props.theme.lineHeight};
  color: ${(props) => props.theme.fonts.body.color};
  font-size: ${(props) => props.theme.fonts.sizes.small};

  .item-active & {
    opacity: 1;
    max-height: none;
    padding: 0.5rem 0 2rem;
  }
`

const MenuItemDetails = styled('p')`
  margin: 0.1rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  flex-shrink: 0;

  span {
    display: inline-block;
  }
`

const MenuItemPrice = styled(Preface)`
  color: ${(props) => props.theme.fonts.body.color};
  font-size: 1.8rem;
  font-weight: 500;
`

const MenuItemCals = styled(Preface)`
  color: ${(props) => props.theme.fonts.body.color};
  font-size: 1.5rem;
  margin: 0 0 0 0.3rem;

  span {
    font-size: 1.1rem;
  }
`

const MenuItemButtons = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  max-height: 0;

  .item-active & {
    opacity: 1;
    max-height: none;
  }
`

const MenuItem = ({ item, isInverted }) => {
  const dispatch = useDispatch()
  const container = useRef(null)
  const viewButton = useRef(null)
  const addButton = useRef(null)
  const [activeItem, setActiveItem] = useState(null)
  const { soldOut, menuConfig, allergenAlerts } = useContext(MenuContext) || {}
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

  const handleView = (evt) => {
    evt.preventDefault()
    if (!isSoldOut) {
      dispatch(setCurrentItem(item))
      dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
    }
  }

  const handleAdd = (evt) => {
    evt.preventDefault()
    if (!isSoldOut) {
      dispatch(setCurrentItem(item))
      dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
    }
  }

  const handleClick = () => {
    viewButton.current.focus()
  }

  return (
    <MenuItemView
      ref={container}
      onClick={handleClick}
      className={item.id === activeItem ? 'item-active' : ''}
    >
      {/* {cartCount > 0 && <MenuItemCount>{cartCount}</MenuItemCount>}
        {!showImage && itemTag ? (
          <MenuItemAlert>{itemTag}</MenuItemAlert>
        ) : null} */}
      <MenuItemImageView>
        <MenuItemImage imageUrl={imageUrl} isInverted={isInverted}>
          {itemTag && (
            <MenuItemOverlay isSoldOut={isSoldOut}>
              <div>{itemTag}</div>
            </MenuItemOverlay>
          )}
        </MenuItemImage>
      </MenuItemImageView>
      <MenuItemContent isInverted={isInverted}>
        <MenuItemContentHeader>
          <MenuItemName>
            <Heading>{item.name}</Heading>
          </MenuItemName>
          <MenuItemDetails>
            {price && <MenuItemPrice>{price}</MenuItemPrice>}
            {cals && (
              <MenuItemCals>
                <span>/</span> {cals} cals
              </MenuItemCals>
            )}
          </MenuItemDetails>
        </MenuItemContentHeader>
        {item.description && (
          <MenuItemDescription>{item.description}</MenuItemDescription>
        )}
        <MenuItemButtons>
          <MenuItemButton
            ref={viewButton}
            onClick={handleView}
            onFocus={() => setActiveItem(item.id)}
            onBlur={() => setActiveItem(null)}
            isSoldOut={isSoldOut}
            secondary={true}
          >
            View
          </MenuItemButton>
          {menuConfig && (
            <MenuItemButton
              ref={addButton}
              onClick={handleAdd}
              onFocus={() => setActiveItem(item.id)}
              onBlur={() => setActiveItem(null)}
              isSoldOut={isSoldOut}
            >
              Add
            </MenuItemButton>
          )}
        </MenuItemButtons>
      </MenuItemContent>
    </MenuItemView>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  item: propTypes.object,
}

export default MenuItem
