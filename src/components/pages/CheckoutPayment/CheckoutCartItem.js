import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars } from '@open-tender/js'
import { Preface } from '@open-tender/components'
import { OrderContext } from '../../Order/Order'
import { Favorite } from '../../buttons'

const CheckoutCartItemView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  // border-bottom: 0.1rem solid ${(props) => props.theme.colors.primary};
`

const CheckoutCartItemName = styled(Preface)`
  flex: 1;
  display: block;
  padding: 0 1rem 0 0;
  font-weight: normal;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  line-height: 1;
`

const CheckoutCartItemQuantity = styled(Preface)`
  flex: 0 0 4rem;
  display: block;
  font-weight: 500;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  line-height: 1;
  text-align: right;
`

const CheckoutCartItemPrice = styled(CheckoutCartItemQuantity)`
  flex: 0 0 7rem;
`

const CheckoutCartItem = ({ name, quantity, amount, item }) => {
  const orderContext = useContext(OrderContext)
  const { lookup } = orderContext || {}
  const { signature } = item || {}
  const favoriteId = lookup && signature ? lookup[signature] || null : null
  // item comes from the /order/validate response so it's 'is_size', not 'isSize'
  const groups = item ? item.groups || [] : []
  const isSize = groups.length && groups[0].is_size ? true : false
  const option = isSize ? groups[0].options.find((i) => i.quantity === 1) : null
  const itemName = option ? option.name : name

  return (
    <CheckoutCartItemView>
      <CheckoutCartItemName>
        {itemName}
        {signature && (
          <Favorite
            item={item}
            favoriteId={favoriteId}
            style={{ marginLeft: '1.5rem' }}
          />
        )}
      </CheckoutCartItemName>
      {quantity && (
        <CheckoutCartItemQuantity>{quantity}</CheckoutCartItemQuantity>
      )}
      <CheckoutCartItemPrice>{formatDollars(amount)}</CheckoutCartItemPrice>
    </CheckoutCartItemView>
  )
}

CheckoutCartItem.displayName = 'CheckoutCartItem'
CheckoutCartItem.propTypes = {
  name: propTypes.string,
  quantity: propTypes.number,
  amount: propTypes.string,
}

export default CheckoutCartItem
