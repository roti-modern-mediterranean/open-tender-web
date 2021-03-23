import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectTheme } from '../slices'
import { Back } from './buttons'

const CartCloseView = styled('div')`
  position: absolute;
  z-index: 10;
  top: 0;
  left: ${(props) => props.theme.layout.padding};
  width: 5rem;
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: ${(props) => props.theme.layout.paddingMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const CartClose = ({ text, onClick }) => {
  const theme = useSelector(selectTheme)

  return (
    <CartCloseView>
      <Back text={text} onClick={onClick} color={theme.colors.beet} />
    </CartCloseView>
  )
}

CartClose.displayName = 'CartClose'
CartClose.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
}

export default CartClose
