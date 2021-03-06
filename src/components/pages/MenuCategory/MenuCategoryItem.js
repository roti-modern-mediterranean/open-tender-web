import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentItem,
  selectSoldOut,
  selectSelectedAllergenNames,
} from '@open-tender/redux'
import { formatDollars, convertStringToArray } from '@open-tender/js'
import { Preface, useImage } from '@open-tender/components'

import { selectDisplaySettings, toggleSidebarModal } from '../../../slices'
import { BackgroundLoading } from '../..'
import {
  MenuCateringCategoryView,
  MenuCateringContent,
  MenuCateringCategoryTitle,
  MenuCateringCategoryDescription,
  MenuCateringCategoryPrice,
  MenuCateringCategoryShorthand,
} from '../Menu/MenuCateringCategory'
import styled from '@emotion/styled'
import MenuItemAllergens from '../Menu/MenuItemAllergens'

const MenuCategoryItemSoldOut = styled(Preface)`
  display: block;
  color: ${(props) => props.theme.colors.alert};
  font-size: 2.2rem;
  font-weight: 500;
  margin: 0.5rem 0 0;
`

const MenuCategoryItemAllergens = styled('div')`
  margin: 1rem 0 0;

  p {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    span {
      display: flex;
      color: ${(props) => props.theme.colors.light};

      svg {
        fill: ${(props) => props.theme.colors.light};
      }
    }
  }
`

const MenuCategoryItem = ({ category, item }) => {
  const dispatch = useDispatch()
  const soldOut = useSelector(selectSoldOut)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const { allergens: showAllergens } = useSelector(selectDisplaySettings)
  const {
    name,
    app_image_url,
    big_image_url,
    small_image_url,
    price,
    shorthand,
  } = item
  const imageUrl = small_image_url || big_image_url || app_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = imageUrl && !hasLoaded && !hasError
  const isSoldOut = soldOut ? soldOut.includes(item.id) : false
  const allergens = showAllergens ? convertStringToArray(item.allergens) : []
  const allergenAlert =
    allergenAlerts && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []

  const onClick = (evt) => {
    if (!isSoldOut) {
      evt.preventDefault()
      dispatch(setCurrentItem(item))
      dispatch(toggleSidebarModal())
    }
  }

  return (
    <MenuCateringCategoryView
      style={bgStyle}
      as="button"
      onClick={onClick}
      isSoldOut={isSoldOut}
    >
      <MenuCateringContent isSoldOut={isSoldOut}>
        <MenuCateringCategoryTitle as="p">{name}</MenuCateringCategoryTitle>
        <MenuCateringCategoryDescription>
          {price !== '0.00' && (
            <MenuCateringCategoryPrice>
              {formatDollars(price, '', 0)}
            </MenuCateringCategoryPrice>
          )}
          <MenuCateringCategoryShorthand>
            {shorthand}
          </MenuCateringCategoryShorthand>
        </MenuCateringCategoryDescription>
        {allergenAlert.length > 0 && (
          <MenuCategoryItemAllergens>
            <MenuItemAllergens allergens={allergenAlert} />
          </MenuCategoryItemAllergens>
        )}
        {isSoldOut && (
          <p>
            <MenuCategoryItemSoldOut>
              Sold out for the day
            </MenuCategoryItemSoldOut>
          </p>
        )}
      </MenuCateringContent>
      {isLoading && <BackgroundLoading />}
    </MenuCateringCategoryView>
  )
}

MenuCategoryItem.displayName = 'MenuCategoryItem'
MenuCategoryItem.propTypes = {
  category: propTypes.object,
  item: propTypes.object,
}

export default MenuCategoryItem
