import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonFavorite } from '../packages'
import { displayPrice, rehydrateOrderItem } from '../packages/utils/cart'
import {
  selectToken,
  addCustomerFavorite,
  removeCustomerFavorite,
  selectCustomerFavorites,
} from '../slices/customerSlice'
import { selectMenuItems } from '../slices/menuSlice'
import { showNotification } from '../slices/notificationSlice'
import { addItemToCart } from '../slices/orderSlice'

const OrderItemCard = ({ item }) => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
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

  const addFavorite = (cart) => {
    const data = { cart }
    dispatch(addCustomerFavorite({ token, data }))
  }

  const removeFavorite = (favoriteId) => {
    dispatch(removeCustomerFavorite({ token, favoriteId }))
  }

  return (
    <div className="order-card bg-color border border-radius ot-box-shadow">
      <div className="order-card__container">
        <div className="order-card__header">
          {totalPrice && (
            <p className="order-card__number preface font-size-x-small secondary-color">
              ${displayPrice(totalPrice / quantity)}
            </p>
          )}
          <p className="order-card__title font-size-small">{name}</p>
        </div>
        <div className="order-card__content">
          <div className="">
            {bgStyle && (
              <div
                className="order-card__item-image border-radius-small bg-image"
                style={bgStyle}
              ></div>
            )}
            <p className="font-size-x-small secondary-color">{optionNames}</p>
          </div>
        </div>
        <div className="order-card__footer">
          <div className="order-card__footer__buttons">
            <Button
              text="Add To Cart"
              icon="PlusCircle"
              onClick={(evt) => addToCart(evt, item)}
              classes="btn--small font-size-small"
            />
            <ButtonFavorite
              item={item}
              favoriteId={favoriteId}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
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
