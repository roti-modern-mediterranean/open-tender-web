import React from 'react'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { Link } from 'react-router-dom'

import { Header, Logo } from '.'
import { Cart, NavMenu, Locations, GroupOrder } from './buttons'

const HeaderDefault = ({ path = '/', showGroup = false }) => {
  return (
    <Header
      left={<NavMenu />}
      title={
        isBrowser ? (
          <Link to={path}>
            <Logo />
          </Link>
        ) : (
          <Locations />
        )
      }
      right={
        <>
          {isBrowser && <Locations />}
          {showGroup && <GroupOrder />}
          <Cart />
        </>
      }
      bgColor={isBrowser ? 'dark' : 'primary'}
      borderColor={isBrowser ? 'dark' : 'primary'}
    />
  )
}

HeaderDefault.displayName = 'HeaderDefault'
HeaderDefault.propTypes = {
  path: propTypes.string,
}

export default HeaderDefault
