import React from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { selectBrand } from '../slices'
import styled from '@emotion/styled'

const HeaderLogoLink = styled('a')`
  display: block;
  // max-width: 16rem;
  max-width: 14rem;
  margin: 0.4rem 0 0 1.2rem;
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  //   max-width: 14rem;
  // }
`

const HeaderLogoImage = styled('img')`
  pointer-events: none;
`

const HeaderLogo = () => {
  const brand = useSelector(selectBrand)
  const logoUrl = isMobile ? brand.logoLight : brand.logo

  return (
    <HeaderLogoLink href={brand.url} rel="noopener noreferrer">
      <HeaderLogoImage src={logoUrl} alt="logo" />
    </HeaderLogoLink>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
