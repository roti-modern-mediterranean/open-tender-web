import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const AccountSettings = ({
  text = 'Account',
  path = '/account',
  icon = iconMap.User,
}) => {
  const history = useHistory()

  return (
    <ButtonBoth text={text} icon={icon} onClick={() => history.push(path)} />
  )
}

AccountSettings.displayName = 'AccountSettings'
AccountSettings.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default AccountSettings
