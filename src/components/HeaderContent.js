import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Link } from 'react-router-dom'

import { Header, Logo } from '.'
import { NavMenu } from './buttons'

const HeaderContent = () => {
  return (
    <Header
      left={<NavMenu />}
      title={
        <Link to="/">
          <Logo />
        </Link>
      }
      bgColor={isBrowser ? 'dark' : 'primary'}
      borderColor={isBrowser ? 'dark' : 'primary'}
    />
  )
}

HeaderContent.displayName = 'HeaderContent'

export default HeaderContent
