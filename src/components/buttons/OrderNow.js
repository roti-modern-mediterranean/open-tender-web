import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCanOrder,
  selectCartQuantity,
  selectOrder,
  setOrderServiceType,
} from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'

import { ButtonStyled, ButtonIcon } from '@open-tender/components'
import iconMap from '../iconMap'

const OrderNow = ({ text = 'Order Now', icon = null }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderType, serviceType } = useSelector(selectOrder)
  const canOrder = useSelector(selectCanOrder)
  const cartQuantity = useSelector(selectCartQuantity)
  const color = isBrowser ? '#E73C3E' : '#621C27'
  const showCart = canOrder && cartQuantity > 0
  const mobileStyles = {
    // padding: '1rem 0',
    // border: '0',
    backgroundColor: 'transparent',
  }

  const onClick = () => {
    if (!orderType || !serviceType) {
      dispatch(setOrderServiceType('OLO', 'PICKUP'))
    }
    history.push(`/locations`)
  }

  return showCart ? (
    <ButtonIcon label={text} onClick={onClick} color={color}>
      {icon || iconMap.ShoppingBag}
    </ButtonIcon>
  ) : (
    <ButtonStyled
      onClick={onClick}
      color={isBrowser ? 'primary' : 'header'}
      size={isBrowser ? 'default' : 'header'}
      style={!isBrowser ? mobileStyles : null}
    >
      {text}
    </ButtonStyled>
  )
}

OrderNow.displayName = 'OrderNow'
OrderNow.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default OrderNow
