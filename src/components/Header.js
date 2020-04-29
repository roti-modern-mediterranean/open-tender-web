import React from 'react'
// import propTypes from 'prop-types'
import logo from '../logo.svg'

const Header = () => {
  return (
    <header className="header container flex">
      <img src={logo} className="logo" alt="logo" />
    </header>
  )
}

Header.displayName = 'Header'

export default Header
