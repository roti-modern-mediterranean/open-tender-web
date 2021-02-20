import React from 'react'
import { useSelector } from 'react-redux'

import { selectBrand } from '../slices'
import styled from '@emotion/styled'

const HeaderLogoLink = styled('a')`
  display: block;
  max-width: 14rem;
  margin: 0.4rem 0 0 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-left: 1.5rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderLogo = ({ useLight = false }) => {
  const brand = useSelector(selectBrand)
  const logoUrl = useLight ? brand.logoLight : brand.logo

  return (
    <HeaderLogoLink href={brand.url} rel="noopener noreferrer">
      <img src={logoUrl} alt="logo" />
    </HeaderLogoLink>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
