import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  selectTimezone,
  resetOrderType,
  selectAutoSelect,
  resetOrder,
  resetCheckout,
  selectCustomer,
  logoutCustomer,
} from 'open-tender-redux'
import { makeServiceTypeName } from 'open-tender-js'
import {
  ButtonAccount,
  ButtonSignUp,
  ButtonAllergens,
  ButtonCancelEdit,
  ButtonGroupOrder,
  ButtonRevenueCenter,
  ButtonRequestedAt,
  ButtonServiceType,
  ButtonStartOver,
} from 'open-tender'

import { selectOutpostName, openModal } from '../slices'
import HeaderLogo from './HeaderLogo'

const makeClasses = (pathname) => {
  return ['checkout'].map((i) => (pathname.includes(i) ? 'header__stuck' : ''))
}

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    orderId,
    orderType,
    serviceType,
    revenueCenter,
    isOutpost,
    requestedAt,
  } = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)
  const tz = useSelector(selectTimezone)
  const { profile } = useSelector(selectCustomer)
  const outpostName = useSelector(selectOutpostName)
  const { pathname } = useLocation()
  const isCheckout = pathname.includes('checkout')
  if (isCheckout) return null
  const isHome = pathname === '/'
  const isRevenueCenterPage = pathname.includes('locations/')
  const isMenu = pathname.includes('menu')
  const isAccount = pathname.includes('account')
  const classes = makeClasses(pathname)
  const isCatering = orderType === 'CATERING'
  const serviceTypeName = makeServiceTypeName(
    serviceType,
    isCatering,
    isOutpost,
    outpostName
  )
  const hasGroupOrdering = revenueCenter && revenueCenter.group_ordering_allowed

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'login' }))
    evt.target.blur()
  }

  const handleSignUp = (evt) => {
    evt.preventDefault()
    history.push(`/signup`)
    evt.target.blur()
  }

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer())
    evt.target.blur()
  }

  const handleStartOver = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    history.push(`/`)
    evt.target.blur()
  }

  const handleServiceType = (evt) => {
    evt.preventDefault()
    const startOver = () => history.push(`/`)
    dispatch(openModal({ type: 'orderType', args: { startOver } }))
    // dispatch(resetOrderType())
    // history.push(`/`)
    evt.target.blur()
  }

  const handleCatering = (evt) => {
    evt.preventDefault()
    history.push(`/catering`)
    evt.target.blur()
  }

  const handleLocation = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  const handleRequestedAt = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
    evt.target.blur()
  }

  const handleAllergens = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'allergens' }))
    evt.target.blur()
  }

  const handleGroupOrder = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'groupOrder' }))
    evt.target.blur()
  }

  const handleCancelEdit = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    dispatch(resetCheckout())
    history.push(`/account`)
    evt.target.blur()
  }

  return (
    <header className={`header container flex ${classes}`}>
      <div className="header__nav">
        {isHome || isRevenueCenterPage ? (
          <div className="header__logo">
            <HeaderLogo />
          </div>
        ) : (
          <ButtonStartOver onClick={handleStartOver} classes="btn--header" />
        )}
      </div>
      <div className="header__actions">
        <ButtonAccount
          account={profile}
          isAccount={isAccount}
          login={handleLogin}
          logout={handleLogout}
          goToAccount={handleAccount}
          classes="btn--header"
        />
        {isHome && !profile && (
          <ButtonSignUp
            text="Sign Up"
            signUp={handleSignUp}
            classes="btn--header"
          />
        )}
        {revenueCenter && !isCheckout && !autoSelect && (
          <ButtonRevenueCenter
            revenueCenter={revenueCenter}
            onClick={handleLocation}
            classes="btn--header"
          />
        )}
        {serviceType && !isCheckout && (
          <ButtonServiceType
            serviceType={serviceType}
            serviceTypeName={serviceTypeName}
            onClick={isCatering ? handleCatering : handleServiceType}
            classes="btn--header"
          />
        )}
        {revenueCenter && !isCheckout && (
          <ButtonRequestedAt
            requestedAt={requestedAt}
            tz={tz}
            onClick={handleRequestedAt}
            classes="btn--header"
          />
        )}
        {isMenu && (
          <>
            <ButtonAllergens onClick={handleAllergens} classes="btn--header" />
            {hasGroupOrdering && (
              <ButtonGroupOrder
                onClick={handleGroupOrder}
                classes="btn--header"
              />
            )}
          </>
        )}
        {orderId && (
          <ButtonCancelEdit
            onClick={handleCancelEdit}
            classes="btn--header-cancel"
          />
        )}
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
