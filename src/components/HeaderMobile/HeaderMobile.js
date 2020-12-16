import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { contains } from '@open-tender/js'
import { selectCustomer } from '@open-tender/redux'
import HeaderButton from './HeaderButton'
import { Menu } from 'react-feather'
import styled from '@emotion/styled'

const HeaderMobileContainer = styled('div')`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background-color: ${(props) => props.bgColor || props.theme.bgColors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.3rem;
`

const transparentRoutes = ['account']

const HeaderMobile = () => {
  const { profile } = useSelector(selectCustomer)
  const { pathname } = useLocation()
  const isAccount = pathname === '/account'
  const isTransparent = contains(pathname, transparentRoutes)
  const bgColor = isTransparent ? 'transparent' : null
  return (
    <HeaderMobileContainer bgColor={bgColor}>
      <div>
        {isAccount ? (
          <HeaderButton>
            <Menu size={20} />
          </HeaderButton>
        ) : null}
      </div>
      <div></div>
    </HeaderMobileContainer>
  )
}

HeaderMobile.displayName = 'HeaderMobile'

export default HeaderMobile
