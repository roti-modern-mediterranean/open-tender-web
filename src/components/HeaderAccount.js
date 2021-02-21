import React from 'react'
import propTypes from 'prop-types'

import { HeaderMobile } from '.'
import { Home, Logout } from './buttons'
import { isBrowser } from 'react-device-detect'
import AccountTabs from './pages/Account/AccountTabs'

const HeaderAccount = ({
  maxWidth = '100%',
  title,
  bgColor,
  borderColor,
  text,
  path,
}) => {
  return (
    <HeaderMobile
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={<Home text={text} path={path} />}
      right={
        <>
          {isBrowser && <AccountTabs />}
          <Logout />
        </>
      }
    />
  )
}

HeaderAccount.displayName = 'HeaderAccount'
HeaderAccount.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  text: propTypes.string,
  path: propTypes.string,
}

export default HeaderAccount
