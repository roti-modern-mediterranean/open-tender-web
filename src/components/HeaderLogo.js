import React from 'react'
import { useSelector } from 'react-redux'

import { selectBrand } from '../slices'

const HeaderLogo = () => {
  const brand = useSelector(selectBrand)

  return (
    <a className="no-link" href={brand.url} rel="noopener noreferrer">
      <img src={brand.logo} className="logo" alt="logo" />
    </a>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
