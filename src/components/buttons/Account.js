import React from 'react'
import propTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import {
  selectCustomer,
  logoutCustomer,
  selectGroupOrder,
} from '@open-tender/redux'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import { openModal, toggleNav } from '../../slices'
import iconMap from '../iconMap'

const Account = ({ color = 'header', size = 'header' }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { cartGuest } = useSelector(selectGroupOrder)
  const { pathname } = useLocation()
  const isAccount = pathname.includes('account')
  const isJoinGroup = pathname.includes('join')

  if (cartGuest || isJoinGroup) return null

  return isMobile ? (
    <ButtonIcon color={color} onClick={() => dispatch(toggleNav())}>
      {iconMap['Menu']}
    </ButtonIcon>
  ) : auth ? (
    isAccount ? (
      <ButtonStyled
        onClick={() => dispatch(logoutCustomer())}
        icon={iconMap['UserX']}
        color={color}
        size={size}
      >
        Logout
      </ButtonStyled>
    ) : (
      <ButtonStyled
        onClick={() => history.push(`/account`)}
        label="Manage your account"
        icon={iconMap['User']}
        color={color}
        size={size}
      >
        Account
      </ButtonStyled>
    )
  ) : (
    <ButtonStyled
      onClick={() => dispatch(openModal({ type: 'login' }))}
      label="Log into your account"
      icon={iconMap['UserPlus']}
      color={color}
      size={size}
    >
      Login
    </ButtonStyled>
  )
}

Account.displayName = 'Account'
Account.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default Account
