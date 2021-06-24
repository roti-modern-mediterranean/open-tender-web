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

import Back from './Back'

const Reopen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { cart } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)

  const reopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      history.push('/review')
    })
  }

  return <Back onClick={reopen} />
}

Reopen.displayName = 'Reopen'
Reopen.propTypes = {
  onClick: propTypes.func,
  icon: propTypes.element,
}

export default Reopen
