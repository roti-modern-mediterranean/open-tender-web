import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'
import iconMap from '../iconMap'

const OrderNow = ({ text = 'Order Now', icon = null }) => {
  const history = useHistory()

  const back = () => {
    history.push(`/locations`)
  }

  return isBrowser ? (
    <ButtonStyled icon={icon} onClick={back} color="primary" size="default">
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon label={text} onClick={back}>
      {icon || iconMap.ShoppingBag}
    </ButtonIcon>
  )
}

OrderNow.displayName = 'OrderNow'
OrderNow.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default OrderNow
