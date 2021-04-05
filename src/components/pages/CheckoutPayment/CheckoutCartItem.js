import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars } from '@open-tender/js'
import { Preface } from '@open-tender/components'

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

const CheckoutCartItem = ({ name, quantity, amount }) => {
  return (
    <CheckoutCartItemView>
      <CheckoutCartItemName>{name}</CheckoutCartItemName>
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
