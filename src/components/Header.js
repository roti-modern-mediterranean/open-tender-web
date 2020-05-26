import React from 'react'
// import propTypes from 'prop-types'
// import logo from '../assets/logo.png'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, selectTimezone } from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'
import {
  ButtonAccount,
  ButtonAllergens,
  ButtonGroupOrder,
  ButtonLocation,
  ButtonRequestedAt,
  ButtonServiceType,
} from '../packages'
import HeaderLogo from './HeaderLogo'

const makeNav = (pathname) => {
  return []
}

const makeClasses = (pathname) => {
  return ['checkout'].map((i) => (pathname.includes(i) ? 'header__stuck' : ''))
}

const Header = () => {
  const dispatch = useDispatch()
  const { location, serviceType, requestedAt } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const { pathname } = useLocation()
  const isCheckout = pathname.includes('checkout')
  if (isCheckout) return null
  const isMenu = pathname.includes('menu')
  const navLinks = makeNav(pathname)

  const classes = makeClasses(pathname)

  return (
    <header className={`header container flex ${classes}`}>
      <div className="header__nav">
        <div className="header__logo">
          <HeaderLogo />
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
        {location && !isCheckout && <ButtonLocation classes="btn--header" />}
        {serviceType && !isCheckout && (
          <ButtonServiceType classes="btn--header" />
        )}
        {location && !isCheckout && (
          <ButtonRequestedAt
            classes="btn--header"
            action={() => dispatch(openModal('requestedAt'))}
            requestedAt={requestedAt}
            tz={tz}
          />
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
