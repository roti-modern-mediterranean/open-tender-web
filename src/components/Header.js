import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectOrder,
  selectTimezone,
  resetOrderType,
} from '../slices/orderSlice'
import { openModal } from '../slices/modalSlice'
import { selectCustomer, logoutCustomer } from '../slices/customerSlice'
import {
  ButtonAccount,
  ButtonAllergens,
  ButtonGroupOrder,
  ButtonRevenueCenter,
  ButtonRequestedAt,
  ButtonServiceType,
} from '../packages'
import HeaderLogo from './HeaderLogo'

const makeClasses = (pathname) => {
  return ['checkout'].map((i) => (pathname.includes(i) ? 'header__stuck' : ''))
}

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { revenueCenter, serviceType, requestedAt } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const customer = useSelector(selectCustomer)
  const { account, auth } = customer
  const { pathname } = useLocation()
  const isCheckout = pathname.includes('checkout')
  if (isCheckout) return null
  const isMenu = pathname.includes('menu')
  const isAccount = pathname.includes('account')

  const classes = makeClasses(pathname)

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'login' }))
    evt.target.blur()
  }

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer(auth.access_token))
    evt.target.blur()
  }

  const handleServiceType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    history.push(`/`)
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

  return (
    <header
      className={`header container flex ot-header ot-nav-height ${classes}`}
    >
      <div className="header__nav">
        <div className="header__logo">
          <HeaderLogo />
        </div>
      </div>
      <div className="header__actions">
        <ButtonAccount
          account={account}
          isAccount={isAccount}
          login={handleLogin}
          logout={handleLogout}
          goToAccount={handleAccount}
          classes="btn--header"
        />
        {revenueCenter && !isCheckout && (
          <ButtonRevenueCenter
            revenueCenter={revenueCenter}
            onClick={handleLocation}
            classes="btn--header"
          />
        )}
        {serviceType && !isCheckout && (
          <ButtonServiceType
            serviceType={serviceType}
            onClick={handleServiceType}
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
            <ButtonGroupOrder
              onClick={handleGroupOrder}
              classes="btn--header"
            />
          </>
        )}
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
