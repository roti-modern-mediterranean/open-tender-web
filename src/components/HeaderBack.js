import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Link, useHistory } from 'react-router-dom'

import { Header, Logo } from '.'
import { Cart, Locations, Back } from './buttons'

const HeaderBack = ({ slug }) => {
  const history = useHistory()
  return (
    <Header
      left={<Back onClick={() => history.push(slug)} />}
      title={
        <Link to="/">
          <Logo />
        </Link>
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

HeaderBack.displayName = 'HeaderBack'

export default HeaderBack
