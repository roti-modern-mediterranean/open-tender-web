import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { contains } from '@open-tender/js'
import { selectCustomer } from '@open-tender/redux'
import ButtonSettings from './buttons/ButtonSettings'

const HeaderMobile = () => {
  const { profile } = useSelector(selectCustomer)
  const { pathname } = useLocation()
  const isAccount = pathname === '/account'
  return (
    <header className="header ot-transparent">
      <div className="container">
        <div className="header__container">
          <div className="header__nav">
            {isAccount ? <ButtonSettings /> : null}
          </div>
          <div className="header__actions"></div>
        </div>
      </div>
    </header>
  )
}

HeaderMobile.displayName = 'HeaderMobile'

export default HeaderMobile
