import React from 'react'
import propTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'

const ButtonAccount = ({
  classes = 'ot-btn--secondary ot-btn--header',
  icon = iconMap['User'],
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { pathname } = useLocation()
  const isAccount = pathname.includes('account')

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'login' }))
    evt.target.blur()
  }

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer())
    evt.target.blur()
  }

  return auth ? (
    isAccount ? (
      <Button
        text="Logout"
        ariaLabel="Log out of your account"
        icon={icon}
        classes={classes}
        onClick={handleLogout}
      />
    ) : (
      <Button
        text="Account"
        ariaLabel="Manage your account"
        icon={icon}
        classes={classes}
        onClick={handleAccount}
      />
    )
  ) : (
    <Button
      text="Login"
      ariaLabel="Log into your account"
      icon={icon}
      classes={classes}
      onClick={handleLogin}
    />
  )
}

ButtonAccount.displayName = 'ButtonAccount'
ButtonAccount.propTypes = {
  classes: propTypes.string,
  icon: propTypes.element,
}

export default ButtonAccount
