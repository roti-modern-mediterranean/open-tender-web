import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import Button from './Button'

const AccountButton = ({ classes = 'btn' }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const customer = null

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(openModal('login'))
    evt.target.blur()
  }

  return customer ? (
    <Button
      text="Account"
      ariaLabel="View your account"
      icon="User"
      classes={classes}
      onClick={handleAccount}
    />
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
