import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerFavorites,
  selectMenuItems,
  showNotification,
  addItemToCart,
} from '@open-tender/redux'
import { displayPrice, rehydrateOrderItem } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { ButtonFavorite } from './buttons'
import iconMap from './iconMap'

const OrderItemCard = ({ item }) => {
  const dispatch = useDispatch()
  const { lookup } = useSelector(selectCustomerFavorites)
  const { entities: menuItems } = useSelector(selectMenuItems)
  const { name, groups, quantity, totalPrice, imageUrl, signature } = item
  const favoriteId = lookup[signature] || null
  const optionNames = groups
    .reduce((arr, group) => {
      const names = group.options.map((o) => o.name)
      return [...arr, ...names]
    }, [])
    .join(', ')
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  const addToCart = (evt, item) => {
    evt.preventDefault()
    const menuItem = menuItems.find((i) => i.id === item.id)
    if (!menuItem) {
      dispatch(showNotification('Item not currently available'))
    } else {
      const orderItem = rehydrateOrderItem(menuItem, item)
      dispatch(addItemToCart(orderItem))
      dispatch(showNotification('Item added to cart!'))
    }
    evt.target.blur()
  }

  return (
    <div className="order-card ot-bg-color-primary ot-border ot-border-radius ot-box-shadow slide-up">
      <div className="order-card__container">
        <div className="order-card__header">
          {totalPrice && (
            <p className="order-card__number ot-preface ot-font-size-x-small ot-color-secondary">
              ${displayPrice(totalPrice / quantity)}
            </p>
          )}
          <p className="order-card__title ot-font-size-small">{name}</p>
        </div>
        <div className="order-card__content">
          <div className="">
            {bgStyle && (
              <div
                className="order-card__item-image ot-border-radius-small bg-image"
                style={bgStyle}
              ></div>
            )}
            <p className="ot-font-size-x-small ot-color-secondary">
              {optionNames}
            </p>
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
            <Button
              text="Add To Cart"
              icon={iconMap['PlusCircle']}
              onClick={(evt) => addToCart(evt, item)}
              classes="ot-btn--small ot-font-size-small"
            />
            <ButtonFavorite item={item} favoriteId={favoriteId} />
          </div>
        </div>
      </div>
    </div>
  )
}

OrderItemCard.displayName = 'OrderItemCard'
OrderItemCard.propTypes = {
  item: propTypes.object,
}

export default OrderItemCard
