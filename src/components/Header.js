import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  selectTimezone,
  resetOrderType,
  selectAutoSelect,
  resetCheckout,
  selectCustomer,
} from '@open-tender/redux'
import { makeServiceTypeName } from '@open-tender/js'
import {
  ButtonRevenueCenter,
  ButtonRequestedAt,
  ButtonServiceType,
  ButtonStartOver,
} from '@open-tender/components'

import { selectOutpostName, openModal } from '../slices'
import HeaderLogo from './HeaderLogo'
import {
  ButtonAccount,
  ButtonAllergens,
  ButtonBackToAccount,
  ButtonCancelEdit,
  ButtonGroupOrder,
  ButtonMenu,
  ButtonSignUp,
} from './buttons'

// const makeClasses = (pathname) => {
//   return ['checkout'].map((i) => (pathname.includes(i) ? 'header__stuck' : ''))
// }

const testAccountSubpage = (pathname) => {
  return (
    ['items', 'orders', 'favorites', 'addresses'].filter((i) =>
      pathname.includes(i)
    ).length > 0
  )
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
  // if (isCheckout) return null
  const isHome = pathname === '/'
  const isRevenueCenterPage = pathname.includes('locations/')
  const isMenu = pathname.includes('menu')
  const isLocations = pathname.includes('locations')
  const isAccountSubpage = testAccountSubpage(pathname)
  const isCatering = orderType === 'CATERING'
  const serviceTypeName = makeServiceTypeName(
    serviceType,
    isCatering,
    isOutpost,
    outpostName
  )
  const showSignUp = true
  // let classes = makeClasses(pathname)
  const classes = ''

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

  return (
    <header className={`header ${classes}`}>
      <div className="container">
        <div className="header__container">
          <div className="header__nav">
            {isHome || isRevenueCenterPage ? (
              <div className="header__logo">
                <HeaderLogo />
              </div>
            ) : isLocations ? (
              <ButtonStartOver
                onClick={handleStartOver}
                classes="ot-btn--secondary ot-btn--header"
              />
            ) : isAccountSubpage ? (
              <ButtonBackToAccount />
            ) : isCheckout ? (
              <ButtonMenu text="Back To Menu" />
            ) : (
              <ButtonStartOver
                onClick={handleStartOver}
                classes="ot-btn--secondary ot-btn--header"
              />
            )}
          </div>
          <div className="header__actions">
            <ButtonAccount />
            {isHome && !profile && showSignUp && <ButtonSignUp />}
            {revenueCenter && !isCheckout && !autoSelect && (
              <ButtonRevenueCenter
                revenueCenter={revenueCenter}
                onClick={handleLocation}
                classes="ot-btn--secondary ot-btn--header"
              />
            )}
            {serviceType && !isCheckout && (
              <ButtonServiceType
                serviceType={serviceType}
                serviceTypeName={serviceTypeName}
                onClick={isCatering ? handleCatering : handleServiceType}
                classes="ot-btn--secondary ot-btn--header"
              />
            )}
            {revenueCenter && !isCheckout && (
              <ButtonRequestedAt
                requestedAt={requestedAt}
                tz={tz}
                onClick={handleRequestedAt}
                classes="ot-btn--secondary ot-btn--header"
              />
            )}
            {isMenu && (
              <>
                <ButtonAllergens />
                <ButtonGroupOrder />
              </>
            )}
            {orderId && <ButtonCancelEdit orderId={orderId} />}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
