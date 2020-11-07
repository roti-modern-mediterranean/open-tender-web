import React from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { selectBrand } from '../slices'

const HeaderLogo = () => {
  const brand = useSelector(selectBrand)
  const logoUrl = isMobile ? brand.logoLight : brand.logo

  return (
    <a
      className="no-link link-header"
      href={brand.url}
      rel="noopener noreferrer"
    >
      <img src={logoUrl} className="logo" alt="logo" />
    </a>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
