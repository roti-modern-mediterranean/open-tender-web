import React from 'react'
import propTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import { selectCustomer, logoutCustomer } from '../slices/customerSlice'
import Button from './Button'

const AccountButton = ({ classes = 'btn' }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isAccount = pathname.includes('account')
  const customer = useSelector(selectCustomer)
  const { account, auth } = customer

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(openModal('login'))
    evt.target.blur()
  }

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer(auth.access_token))
    evt.target.blur()
  }

  return account ? (
    isAccount ? (
      <Button
        text="Logout"
        ariaLabel="Log out of your account"
        icon="User"
        classes={classes}
        onClick={handleLogout}
      />
    ) : (
      <Button
        text="Account"
        ariaLabel="View your account"
        icon="User"
        classes={classes}
        onClick={handleAccount}
      />
    )
  ) : (
    <Button
      text="Login"
      ariaLabel="Log into your account"
      icon="User"
      classes={classes}
      onClick={handleLogin}
    />
  )
}

AccountButton.displayName = 'AccountButton'
AccountButton.propTypes = {
  classes: propTypes.string,
}

export default AccountButton
