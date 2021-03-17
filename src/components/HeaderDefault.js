import React from 'react'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
// import { useSelector } from 'react-redux'
// import { selectCustomer } from '@open-tender/redux'

import { Header, Logo } from '.'
import { NavMenu, Locations, OrderNow } from './buttons'

const HeaderDefault = () => {
  // const { auth } = useSelector(selectCustomer)

  return (
    <Header
      left={<NavMenu />}
      title={isBrowser ? <Logo /> : <Locations />}
      right={
        <>
          {isBrowser && <Locations />}
          <OrderNow />
        </>
      }
      bgColor={isBrowser ? 'dark' : 'primary'}
      borderColor={isBrowser ? 'dark' : 'primary'}
    />
  )
}

HeaderDefault.displayName = 'HeaderDefault'
HeaderDefault.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default HeaderDefault
