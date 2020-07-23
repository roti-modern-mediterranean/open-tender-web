import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
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
  const className = isMobile ? `header ot-dark` : `header`
  const btnClass = isMobile
    ? 'ot-btn--mobile'
    : 'ot-btn--header ot-btn--secondary'
  const btnCancelClass = isMobile
    ? 'ot-btn--mobile ot-btn--cancel'
    : 'ot-btn--header ot-btn--cancel'

  return (
    <header className={className}>
      <div className="container">
        <div className="header__container">
          <div className="header__nav">
            {isHome || isRevenueCenterPage ? (
              <div className="header__logo">
                <HeaderLogo />
              </div>
            ) : isMenu && !autoSelect ? (
              <ButtonLocations classes={btnClass} />
            ) : isCheckout ? (
              <ButtonMenu classes={btnClass} />
            ) : isAccountSubpage ? (
              <ButtonBackToAccount classes={btnClass} />
            ) : (
              <ButtonStartOver classes={btnClass} />
            )}
          </div>
          <div className="header__actions">
            <ButtonAccount classes={btnClass} />
            {isHome && !profile && showSignUp && (
              <ButtonSignUp classes={btnClass} />
            )}
            {!isCheckout && <ButtonRevenueCenter classes={btnClass} />}
            {!isCheckout && <ButtonServiceType classes={btnClass} />}
            {!isCheckout && <ButtonRequestedAt classes={btnClass} />}
            {isMenu && (
              <>
                <ButtonAllergens classes={btnClass} />
                <ButtonGroupOrder classes={btnClass} />
              </>
            )}
            <ButtonCancelEdit classes={btnCancelClass} />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
