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
import {
  ButtonAccount,
  ButtonAllergens,
  ButtonGroupOrder,
  ButtonLocation,
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
  const { location, serviceType, requestedAt } = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const { pathname } = useLocation()
  const isCheckout = pathname.includes('checkout')
  if (isCheckout) return null
  const isMenu = pathname.includes('menu')

  const classes = makeClasses(pathname)

  const handleServiceType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    // history.push(`/`)
    evt.target.blur()
  }

  const handleLocation = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  const handleRequestedAt = (evt) => {
    evt.preventDefault()
    dispatch(openModal('requestedAt'))
    evt.target.blur()
  }

  return (
    <header className={`header container flex ${classes}`}>
      <div className="header__nav">
        <div className="header__logo">
          <HeaderLogo />
        </div>
      </div>
      <div className="header__actions">
        <ButtonAccount classes="btn--header" />
        {location && !isCheckout && (
          <ButtonLocation
            location={location}
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
        {location && !isCheckout && (
          <ButtonRequestedAt
            requestedAt={requestedAt}
            tz={tz}
            onClick={handleRequestedAt}
            classes="btn--header"
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
