import React from 'react'
import propTypes from 'prop-types'

import { HeaderMobile } from '.'
import { AccountSettings, Logout } from './buttons'

const HeaderAccount = ({ maxWidth = '100%', title, bgColor, borderColor }) => {
  return (
    <HeaderMobile
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={<AccountSettings />}
      right={<Logout />}
    />
  )
}

HeaderAccount.displayName = 'HeaderAccount'
HeaderAccount.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default HeaderAccount
