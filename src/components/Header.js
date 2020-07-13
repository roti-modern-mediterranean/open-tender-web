import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAutoSelect, selectCustomer } from '@open-tender/redux'

import HeaderLogo from './HeaderLogo'
import {
  ButtonAccount,
  ButtonAllergens,
  ButtonBackToAccount,
  ButtonCancelEdit,
  ButtonGroupOrder,
  ButtonMenu,
  ButtonRequestedAt,
  ButtonRevenueCenter,
  ButtonServiceType,
  ButtonSignUp,
  ButtonStartOver,
  ButtonLocations,
} from './buttons'

const testAccountSubpage = (pathname) => {
  return (
    ['items', 'orders', 'favorites', 'addresses'].filter((i) =>
      pathname.includes(i)
    ).length > 0
  )
}

const Header = () => {
  const autoSelect = useSelector(selectAutoSelect)
  const { profile } = useSelector(selectCustomer)
  const { pathname } = useLocation()
  const isCheckout = pathname.includes('checkout')
  const isHome = pathname === '/'
  const isRevenueCenterPage = pathname.includes('locations/')
  const isMenu = pathname.includes('menu')
  const isAccountSubpage = testAccountSubpage(pathname)
  const showSignUp = true

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__nav">
            {isHome || isRevenueCenterPage ? (
              <div className="header__logo">
                <HeaderLogo />
              </div>
            ) : isMenu && !autoSelect ? (
              <ButtonLocations />
            ) : isCheckout ? (
              <ButtonMenu />
            ) : isAccountSubpage ? (
              <ButtonBackToAccount />
            ) : (
              <ButtonStartOver />
            )}
          </div>
          <div className="header__actions">
            <ButtonAccount />
            {isHome && !profile && showSignUp && <ButtonSignUp />}
            {!isCheckout && <ButtonRevenueCenter />}
            {!isCheckout && <ButtonServiceType />}
            {!isCheckout && <ButtonRequestedAt />}
            {isMenu && (
              <>
                <ButtonAllergens />
                <ButtonGroupOrder />
              </>
            )}
            <ButtonCancelEdit />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
