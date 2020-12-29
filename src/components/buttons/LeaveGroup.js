import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  resetOrderType,
  resetGroupOrder,
  resetCheckout,
} from '@open-tender/redux'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const LeaveGroup = ({
  text = 'Leave Group Order',
  icon = iconMap.ArrowLeft,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const leave = () => {
    dispatch(resetOrderType())
    dispatch(resetGroupOrder())
    dispatch(resetCheckout())
    history.push(`/`)
  }

  return isBrowser ? (
    <ButtonStyled icon={icon} onClick={leave} color="header" size="header">
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon label={text} onClick={leave}>
      {icon}
    </ButtonIcon>
  )
}

LeaveGroup.displayName = 'LeaveGroup'
LeaveGroup.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default LeaveGroup
