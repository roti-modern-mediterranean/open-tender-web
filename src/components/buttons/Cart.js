import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCanOrder,
  selectCartQuantity,
  selectOrder,
  setOrderServiceType,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { ButtonIcon } from '.'
import { CartEmpty, CartFull } from '../icons'
import { toggleSidebar } from '../../slices'
import styled from '@emotion/styled'

const CartCount = styled('span')`
  display: block;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.4rem;
  text-align: center;
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
`

const Cart = ({ text = 'Order Now' }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderType, serviceType } = useSelector(selectOrder)
  const canOrder = useSelector(selectCanOrder)
  const cartQuantity = useSelector(selectCartQuantity)
  const icon =
    cartQuantity > 0
      ? (props) => <CartFull {...props} />
      : (props) => <CartEmpty {...props} />
  const size = isBrowser ? 36 : 24
  const fontSize = isBrowser ? '1.5rem' : '1.0rem'
  const style = isBrowser ? null : { backgroundColor: 'transparent' }

  const onClick = () => {
    if (!orderType || !serviceType) {
      dispatch(setOrderServiceType('OLO', 'PICKUP'))
    }
    history.push(`/locations`)
  }

  return canOrder ? (
    <ButtonIcon
      icon={icon}
      size={size}
      offset="right"
      label="View Cart"
      onClick={() => dispatch(toggleSidebar())}
    >
      {cartQuantity > 0 && (
        <CartCount fontSize={fontSize}>{cartQuantity}</CartCount>
      )}
    </ButtonIcon>
  ) : (
    <ButtonStyled
      onClick={onClick}
      color={isBrowser ? 'primary' : 'header'}
      size={isBrowser ? 'default' : 'header'}
      style={style}
    >
      {text}
    </ButtonStyled>
  )
}

Cart.displayName = 'Cart'
Cart.propTypes = {
  text: propTypes.string,
}

export default Cart
