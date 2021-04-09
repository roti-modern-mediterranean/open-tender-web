import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addCustomerFavorite, removeCustomerFavorite } from '@open-tender/redux'
import { makeSimpleCart } from '@open-tender/js'

import iconMap from '../iconMap'
import styled from '@emotion/styled'

const FavoriteView = styled('button')`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-align: center;
  width: ${(props) => props.theme.favorite.size};
  height: ${(props) => props.theme.favorite.size};
  border-radius: ${(props) => props.theme.favorite.size};
  border: 0.1rem solid ${(props) => props.theme.links.primary.color};
  color: ${(props) =>
    props.selected
      ? props.theme.colors.light
      : props.theme.links.primary.color};
  background-color: ${(props) =>
    props.selected ? props.theme.links.primary.color : 'transparent'};
`

const FavoriteIcon = styled('span')`
  display: block;
  line-height: 0;
  width: ${(props) => props.theme.favorite.iconSize};
  height: ${(props) => props.theme.favorite.iconSize};
`

const Favorite = ({ item, favoriteId, style }) => {
  const dispatch = useDispatch()

  const handleAdd = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    const cart = makeSimpleCart([item])[0]
    delete cart.quantity
    const data = { cart }
    dispatch(addCustomerFavorite(data))
  }

  const handleRemove = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(removeCustomerFavorite(favoriteId))
  }

  return (
    <FavoriteView
      onClick={favoriteId ? handleRemove : handleAdd}
      selected={favoriteId ? true : false}
      aria-label={favoriteId ? 'Remove favorite' : 'Add favorite'}
      style={style}
    >
      <FavoriteIcon>{iconMap.Heart}</FavoriteIcon>
    </FavoriteView>
  )
}

Favorite.displayName = 'Favorite'
Favorite.propTypes = {
  item: propTypes.object,
  favoriteId: propTypes.number,
  style: propTypes.object,
}

export default Favorite
