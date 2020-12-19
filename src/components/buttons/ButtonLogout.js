import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import iconMap from '../iconMap'

const ButtonLogout = ({ classes = 'ot-btn--header' }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer())
    evt.target.blur()
  }

  return auth ? (
    <Button
      text="Logout"
      ariaLabel="Log out of your account"
      icon={iconMap['UserX']}
      classes={classes}
      onClick={handleLogout}
    />
  ) : null
}

ButtonLogout.displayName = 'ButtonLogout'
ButtonLogout.propTypes = {
  classes: propTypes.string,
}

export default ButtonLogout
