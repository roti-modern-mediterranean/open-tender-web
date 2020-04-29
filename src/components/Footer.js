import React from 'react'
import logo from '../logo.svg'

const Footer = () => {
  return (
    <footer className="footer container flex dark">
      <img src={logo} className="logo" alt="logo" />
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
