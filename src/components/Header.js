import React from 'react'
// import propTypes from 'prop-types'
import logo from '../assets/logo.png'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { startOver, selectOrder } from '../slices/orderSlice'
import {
  Button,
  ButtonAccount,
  ButtonAllergens,
  ButtonGroupOrder,
  ButtonLocation,
  ButtonRequestedAt,
  ButtonServiceType,
} from '../packages'

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
  const order = useSelector(selectOrder)
  const isMenu = pathname.includes('menu')
  const isCheckout = pathname.includes('checkout')

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
        <ButtonAccount classes="btn--header" />
        {order.location && !isCheckout && (
          <ButtonLocation classes="btn--header" />
        )}
        {order.serviceType && !isCheckout && (
          <ButtonServiceType classes="btn--header" />
        )}
        {order.location && !isCheckout && (
          <ButtonRequestedAt classes="btn--header" />
        )}
        {isMenu && (
          <>
            <ButtonAllergens classes="btn--header" />
            <ButtonGroupOrder classes="btn--header" />
          </>
        )}
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
