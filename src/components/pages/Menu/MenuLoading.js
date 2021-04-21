import React, { useContext } from 'react'
import styled from '@emotion/styled'

import { Loading } from '../..'
import { MenuContext } from './Menu'

const MenuLoadingView = styled('div')`
  margin: ${(props) => props.theme.layout.margin} auto 50rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} auto 50rem;
  }
`

const MenuLoading = () => {
  const { isLoading, loadingMessage } = useContext(MenuContext)
  return isLoading ? (
    <MenuLoadingView>
      <Loading text={loadingMessage} />
    </MenuLoadingView>
  ) : null
}

MenuLoading.displayName = 'MenuLoading'

export default MenuLoading
