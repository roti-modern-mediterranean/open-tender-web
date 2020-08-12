import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  setCart,
  selectGroupOrder,
  closeGroupOrder,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonReopen = ({
  text = 'Reopen Group Order',
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['ArrowLeft'],
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { cart } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)

  const onClick = (evt) => {
    evt.preventDefault()
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      history.push('/review')
    })

    evt.target.blur()
  }

  return <Button text={text} icon={icon} classes={classes} onClick={onClick} />
}

ButtonReopen.displayName = 'ButtonReopen'
ButtonReopen.propTypes = {
  onClick: propTypes.func,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonReopen
