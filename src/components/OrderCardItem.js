import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerFavorites,
  selectMenuItems,
  showNotification,
  addItemToCart,
  addCustomerFavorite,
  removeCustomerFavorite,
} from '@open-tender/redux'
import {
  displayPrice,
  rehydrateOrderItem,
  makeSimpleCart,
} from '@open-tender/js'

import { Card, CardButton } from '.'

const OrderCardItem = ({ item }) => {
  const dispatch = useDispatch()
  const { lookup } = useSelector(selectCustomerFavorites)
  const { entities: menuItems } = useSelector(selectMenuItems)
  const { name, groups, quantity, totalPrice, imageUrl, signature } = item
  const price = totalPrice ? `$${displayPrice(totalPrice / quantity)}` : null
  const favoriteId = lookup[signature] || null
  const optionNames = groups
    .reduce((arr, group) => {
      const names = group.options.map((o) => o.name)
      return [...arr, ...names]
    }, [])
    .join(', ')

  const addToCart = (item) => {
    const menuItem = menuItems.find((i) => i.id === item.id)
    if (!menuItem) {
      dispatch(showNotification('Item not currently available'))
    } else {
      const orderItem = rehydrateOrderItem(menuItem, item)
      dispatch(addItemToCart(orderItem))
      dispatch(showNotification('Item added to cart!'))
    }
  }

  const handleFavorite = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (favoriteId) {
      dispatch(removeCustomerFavorite(favoriteId))
    } else {
      const cart = makeSimpleCart([item])[0]
      delete cart.quantity
      const data = { cart }
      dispatch(addCustomerFavorite(data))
    }
  }

  return (
    <Card
      imageUrl={imageUrl}
      preface={<span>{price}</span>}
      title={name}
      description={
        <>
          <p>{optionNames}</p>
        </>
      }
      view={(props) => (
        <CardButton {...props} onClick={handleFavorite}>
          {favoriteId ? 'Unfav' : 'Fav'}
        </CardButton>
      )}
      add={(props) => (
        <CardButton {...props} onClick={() => addToCart(item)}>
          Add
        </CardButton>
      )}
    />
  )
}

OrderCardItem.displayName = 'OrderCardItem'
OrderCardItem.propTypes = {
  item: propTypes.object,
}

export default OrderCardItem
