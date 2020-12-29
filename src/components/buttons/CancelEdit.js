import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, resetOrder, resetCheckout } from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const CancelEdit = ({ text = 'Cancel Edit', icon = iconMap.XCircle }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { orderId } = useSelector(selectOrder)

  const cancel = () => {
    dispatch(resetOrder())
    dispatch(resetCheckout())
    history.push(`/account`)
  }

  if (!orderId) return null

  return (
    <ButtonBoth
      text={text}
      label={`Cancel editing order ${orderId}`}
      icon={icon}
      onClick={cancel}
    />
  )
}

CancelEdit.displayName = 'CancelEdit'
CancelEdit.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default CancelEdit
