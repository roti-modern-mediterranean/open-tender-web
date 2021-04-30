import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars } from '@open-tender/js'
import { Preface } from '@open-tender/components'

import iconMap from './iconMap'
import { CartItemQuantity } from '.'

const CartItemView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 0.1rem solid #e3dfc9;
`

const CartItemName = styled(Preface)`
  flex: 1;
  display: block;
  padding: 0 1rem 0 0;
  font-weight: normal;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  line-height: 1;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`

const CartItemPrice = styled(Preface)`
  flex: 0 0 6rem;
  display: block;
  font-weight: 500;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  line-height: 1;
  text-align: right;
`

const CartItemEdit = styled('div')`
  flex: 0 0 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const CartItemEditButton = styled('button')`
  display: block;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.beet};
  border: 0.1rem solid ${(props) => props.theme.colors.beet};

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.colors.primary};
    border: 0.1rem solid ${(props) => props.theme.colors.primary};
  }

  span {
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    line-height: 0;
  }
`

const CartItem = ({ item, editItem, children }) => {
  const price = formatDollars(item.totalPrice)
  const groups = item ? item.groups || [] : []
  const isSize = groups.length && groups[0].isSize ? true : false
  const option = isSize ? groups[0].options.find((i) => i.quantity === 1) : null
  const name = option ? option.name : item.name
  return (
    <CartItemView>
      <CartItemName>{name}</CartItemName>
      <CartItemQuantity>{children}</CartItemQuantity>
      <CartItemPrice>{price}</CartItemPrice>
      <CartItemEdit>
        <CartItemEditButton onClick={editItem}>
          <span>{iconMap.Edit2}</span>
        </CartItemEditButton>
      </CartItemEdit>
    </CartItemView>
  )
}

CartItem.displayName = 'CartItem'
CartItem.propTypes = {
  item: propTypes.object,
  editItem: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CartItem
