import React from 'react'
// import propTypes from 'prop-types'
import logo from '../logo.png'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { startOver } from '../slices/orderSlice'
import Button from './Button'

const makeNav = (pathname) => {
  return []
}

const makeClasses = (pathname) => {
  return ['checkout'].map((i) => (pathname.includes(i) ? 'header__stuck' : ''))
}

const Header = () => {
  const { pathname } = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const navLinks = makeNav(pathname)

  const handleLogo = (evt) => {
    evt.preventDefault()
    dispatch(startOver())
    history.push(`/`)
    evt.target.blur()
  }

  const classes = makeClasses(pathname)

  return (
    <header className={`header container flex ${classes}`}>
      <div className="header__nav">
        <div className="header__logo">
          <Button onClick={handleLogo}>
            <img src={logo} className="logo" alt="logo" />
          </Button>
        </div>
        {navLinks.length ? (
          <nav className="header__nav">
            <ul>
              {navLinks.map((link) => (
                <li>
                  <NavLink to={link.pathname}>{link.text}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
      <div className="header__actions">
        <Button
          text="Login"
          ariaLabel="Log into your account"
          icon="User"
          classes="btn--header"
          onClick={() => dispatch(startOver())}
        />
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
