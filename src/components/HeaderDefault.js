import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Link } from 'react-router-dom'

import { Header, Logo } from '.'
import { Cart, NavMenu, Locations } from './buttons'

const HeaderDefault = () => {
  return (
    <Header
      left={<NavMenu />}
      title={
        isBrowser ? (
          <Link to="/">
            <Logo />
          </Link>
        ) : (
          <Locations />
        )
      }
      right={
        <>
          {isBrowser && <Locations />}
          <Cart />
        </>
      }
      bgColor={isBrowser ? 'dark' : 'primary'}
      borderColor={isBrowser ? 'dark' : 'primary'}
    />
  )
}

HeaderDefault.displayName = 'HeaderDefault'

export default HeaderDefault
