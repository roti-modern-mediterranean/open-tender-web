import React from 'react'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'

import { selectConfig } from '../slices'
import Background from './Background'

const AccountBackground = ({ imageUrl }) => {
  const config = useSelector(selectConfig)
  return isBrowser ? (
    <Background imageUrl={imageUrl || config.account.background} />
  ) : null
}

AccountBackground.displayName = 'AccountBackground'
AccountBackground.propTypes = {
  imageUrl: propTypes.string,
}

export default AccountBackground
